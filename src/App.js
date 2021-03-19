import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Home from './views/Home';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <Switch>
            <Route path='/' exact={true} component={Home} ></Route>
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;