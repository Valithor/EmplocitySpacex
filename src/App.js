import React from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import { Typography, Container } from '@material-ui/core';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from "@apollo/client/utilities";
import { ApolloProvider } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launches: offsetLimitPagination()
        },
      },
    },
  })
});

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Header/>
      <ApolloProvider client={apolloClient}>
        <Container  maxWidth="md">
          <Switch>
            <Route path='/' exact component={()=><Home type="all"/>} ></Route>
            <Route path='/favourites' exact={true} component={()=><Home type='favs'/>} ></Route>
          </Switch>
        </Container>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;