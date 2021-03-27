const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (env, argv) =>({
    output:{
        publicPath: (argv || {}).mode === 'production' ? '/EmplocitySpacex' : '/',
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
    },
    devServer:{
        port: 3000,
        historyApiFallback: true
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        ],
});