import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import GlobalStyle from './GlobalStyle';
import store from './store';

ReactDOM.render(
  <ReduxProvider store={store}>
    <GlobalStyle />
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
