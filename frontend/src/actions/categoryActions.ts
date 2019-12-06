import { Dispatch } from 'redux';
import { Category } from '../../../shared/types';

export const FETCH_CATEGORY_LIST_SUCCESS = 'FETCH_CATEGORY_LIST_SUCCESS';
export const FETCH_CATEGORY_LIST_LOADING = 'FETCH_CATEGORY_LIST_LOADING';
export const FETCH_CATEGORY_LIST_ERROR = 'FETCH_CATEGORY_LIST_ERROR';

export interface CategoryAction {
  type: string;
  categories?: Category[];
}

export const getCategoriesAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_CATEGORY_LIST_LOADING });
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
      const categories: Category[] = await response.json();
      dispatch({ type: FETCH_CATEGORY_LIST_SUCCESS, categories });
    } catch (e) {
      dispatch({ type: FETCH_CATEGORY_LIST_ERROR });
    }
  };
};
