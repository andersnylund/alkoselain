import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import GlobalStyle from './GlobalStyle';
import store from './store';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          // eslint-disable-next-line no-console
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: '/graphql'
    })
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

ReactDOM.render(
  <ReduxProvider store={store}>
    <ApolloProvider client={client}>
      <GlobalStyle />
      <App />
    </ApolloProvider>
  </ReduxProvider>,
  document.getElementById('root')
);

export default { client };
