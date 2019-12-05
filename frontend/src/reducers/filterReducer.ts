/* eslint-disable no-param-reassign */
import produce from 'immer';

import { filterableFields, allCategories } from '../constants';
import {
  SET_SELECTED_FIELD,
  TOGGLE_SORT,
  SET_SEARCH,
  SET_SELECTED_CATEGORY,
  FilterAction,
} from '../actions/filterActions';
import { SortOrder } from '../../../shared/types';

export interface FilterState {
  selectedField: string;
  sort: SortOrder;
  search: string;
  selectedCategory: string;
}

const initialState: FilterState = {
  selectedField: filterableFields[0].key,
  sort: 'ASC',
  search: '',
  selectedCategory: allCategories.key,
};

const reducer = (state = initialState, action: FilterAction): FilterState => {
  if (action.type === SET_SELECTED_FIELD) {
    return produce(state, draft => {
      draft.selectedField = action.field!;
    });
  }
  if (action.type === TOGGLE_SORT) {
    return produce(state, draft => {
      draft.sort = state.sort === 'ASC' ? 'DESC' : 'ASC';
    });
  }
  if (action.type === SET_SEARCH) {
    return produce(state, draft => {
      draft.search = action.search!;
    });
  }
  if (action.type === SET_SELECTED_CATEGORY) {
    return produce(state, draft => {
      draft.selectedCategory = action.category!;
    });
  }
  return state;
};

export default reducer;
