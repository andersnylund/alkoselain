import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import GlobalStyle from './GlobalStyle';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
