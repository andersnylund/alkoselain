import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import GlobalStyle from './GlobalStyle';

const client = new ApolloClient();

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

export default { client };
