/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  FETCH_PRODUCT_LIST_ERROR,
  FETCH_PRODUCT_LIST_LOADING,
  FETCH_PRODUCT_LIST_SUCCESS,
} from '../actions/productListActions';

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === FETCH_PRODUCT_LIST_LOADING) {
    return produce(state, draft => {
      draft.isLoading = true;
    });
  }
  if (action.type === FETCH_PRODUCT_LIST_ERROR) {
    return produce(state, draft => {
      draft.isError = true;
    });
  }
  if (action.type === FETCH_PRODUCT_LIST_SUCCESS) {
    return produce(state, draft => {
      draft.products = action.products;
      draft.isError = false;
      draft.isLoading = false;
    });
  }
  return state;
};

export default reducer;
