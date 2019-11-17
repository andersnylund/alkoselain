import { Product } from '../../../shared/types';
import { Dispatch } from 'redux';

export const FETCH_PRODUCT_LIST_SUCCESS = 'FETCH_PRODUCT_LIST_SUCCESS';
export const FETCH_PRODUCT_LIST_LOADING = 'FETCH_PRODUCT_LIST_LOADING';
export const FETCH_PRODUCT_LIST_ERROR = 'FETCH_PRODUCT_LIST_ERROR';

export interface ProductListAction {
  type: string;
  products?: Product[];
}

export const getProducts = (page: number) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_PRODUCT_LIST_LOADING });
    try {
      const response = await fetch(`/api/products?page=${page}`);
      const products: Product[] = await response.json();
      dispatch({ type: FETCH_PRODUCT_LIST_SUCCESS, products });
    } catch (e) {
      dispatch({ type: FETCH_PRODUCT_LIST_ERROR });
    }
  };
};
