/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  FETCH_CATEGORY_LIST_ERROR,
  FETCH_CATEGORY_LIST_LOADING,
  FETCH_CATEGORY_LIST_SUCCESS,
  CategoryAction,
} from '../actions/categoryActions';
import { Category } from '../../../shared/types';

export interface CategoryState {
  isLoading: boolean;
  isError: boolean;
  categories: Category[];
}

const initialState: CategoryState = {
  isLoading: false,
  isError: false,
  categories: [],
};

const reducer = (state = initialState, action: CategoryAction): CategoryState => {
  if (action.type === FETCH_CATEGORY_LIST_LOADING) {
    return produce(state, draft => {
      draft.isLoading = true;
    });
  }
  if (action.type === FETCH_CATEGORY_LIST_ERROR) {
    return produce(state, draft => {
      draft.isError = true;
    });
  }
  if (action.type === FETCH_CATEGORY_LIST_SUCCESS) {
    return produce(state, draft => {
      draft.categories = action.categories!;
      draft.isLoading = false;
      draft.isError = false;
    });
  }
  return state;
};

export default reducer;
