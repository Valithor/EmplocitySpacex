import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from "@apollo/client/utilities";
import { ApolloProvider } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          missions: offsetLimitPagination()
        },
      },
    },
  })
});

const App = () => {
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <Header/>
        <Switch>
            <Route path='/' exact component={()=><Home type="all"/>} ></Route>
            <Route path='/favourites' exact={true} component={()=><Home type='favs'/>} ></Route>
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;