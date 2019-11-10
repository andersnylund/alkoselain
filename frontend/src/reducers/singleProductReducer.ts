/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_LOADING,
  FETCH_PRODUCT_SUCCESS,
  SingleProductAction,
} from '../actions/singleProductActions';
import { Product } from '../../../shared/types';

export interface SingleProductState {
  isLoading: boolean;
  isError: boolean;
  product: Product | undefined;
}

const initialState: SingleProductState = {
  isLoading: false,
  isError: false,
  product: undefined,
};

const reducer = (state = initialState, action: SingleProductAction) => {
  if (action.type === FETCH_PRODUCT_LOADING) {
    return produce(state, draft => {
      draft.isLoading = true;
    });
  }
  if (action.type === FETCH_PRODUCT_ERROR) {
    return produce(state, draft => {
      draft.isError = true;
    });
  }
  if (action.type === FETCH_PRODUCT_SUCCESS) {
    return produce(state, draft => {
      draft.product = action.product;
      draft.isError = false;
      draft.isLoading = false;
    });
  }
  return state;
};

export default reducer;
