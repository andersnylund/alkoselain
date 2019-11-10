import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import filterReducer from './reducers/filterReducer';
import productReducer from './reducers/productReducer';

const reducer = combineReducers({
  filter: filterReducer,
  product: productReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
