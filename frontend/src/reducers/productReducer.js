/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_LOADING,
  FETCH_PRODUCTS_SUCCESS,
} from '../actions/productActions';

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === FETCH_PRODUCTS_LOADING) {
    return produce(state, draft => {
      draft.isLoading = true;
    });
  }
  if (action.type === FETCH_PRODUCTS_ERROR) {
    return produce(state, draft => {
      draft.isError = true;
    });
  }
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return produce(state, draft => {
      draft.products = action.products;
      draft.isError = false;
      draft.isLoading = false;
    });
  }
  return state;
};

export default reducer;
