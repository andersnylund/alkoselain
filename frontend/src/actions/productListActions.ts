import { Product, SortOrder } from '../../../shared/types';
import { Dispatch } from 'redux';

export const FETCH_PRODUCT_LIST_SUCCESS = 'FETCH_PRODUCT_LIST_SUCCESS';
export const FETCH_PRODUCT_LIST_LOADING = 'FETCH_PRODUCT_LIST_LOADING';
export const FETCH_PRODUCT_LIST_ERROR = 'FETCH_PRODUCT_LIST_ERROR';

export interface ProductListAction {
  type: string;
  products?: Product[];
}

export const getProducts = (
  page: number,
  categoryId: string,
  orderBy: string,
  order: SortOrder,
  searchString: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_PRODUCT_LIST_LOADING });
    try {
      const response = await fetch(
        `/api/products?page=${page}&categoryId=${categoryId}&orderBy=${orderBy}&order=${order}&searchString=${searchString}`
      );
      if (response.ok) {
        const products: Product[] = await response.json();
        dispatch({ type: FETCH_PRODUCT_LIST_SUCCESS, products });
      } else {
        throw new Error('Oops! Something went wrong');
      }
    } catch (e) {
      dispatch({ type: FETCH_PRODUCT_LIST_ERROR });
    }
  };
};
