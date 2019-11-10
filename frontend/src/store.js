import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import filterReducer from './reducers/filterReducer';
import productListReducer from './reducers/productListReducer';
import singleProductReducer from './reducers/singleProductReducer';

const reducer = combineReducers({
  filter: filterReducer,
  productList: productListReducer,
  product: singleProductReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
