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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
      if (response.ok) {
        const product: Product = await response.json();
        dispatch({ type: FETCH_PRODUCT_SUCCESS, product });
      } else {
        throw new Error('Hups... Jotakin meni pieleen');
      }
    } catch (e) {
      dispatch({ type: FETCH_PRODUCT_ERROR });
    }
  };
};
