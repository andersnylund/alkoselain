import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import filterReducer, { FilterState } from './reducers/filterReducer';
import productListReducer, { ProductListState } from './reducers/productListReducer';
import singleProductReducer, { SingleProductState } from './reducers/singleProductReducer';

export interface AppState {
  filter: FilterState;
  productList: ProductListState;
  product: SingleProductState;
}

const reducer = combineReducers({
  filter: filterReducer,
  productList: productListReducer,
  product: singleProductReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
