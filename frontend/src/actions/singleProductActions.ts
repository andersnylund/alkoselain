import { Dispatch } from 'redux';
import { Product } from '../../../shared/types';

export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_LOADING = 'FETCH_PRODUCT_LOADING';
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR';

export interface SingleProductAction {
  type: string;
  product?: Product;
}

export const getProduct = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_PRODUCT_LOADING });
    try {
      const response = await fetch(`/api/products/${id}`);
      const product: Product = await response.json();
      dispatch({ type: FETCH_PRODUCT_SUCCESS, product });
    } catch (e) {
      dispatch({ type: FETCH_PRODUCT_ERROR });
    }
  };
};
