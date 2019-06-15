/* eslint-disable no-param-reassign */
import produce from 'immer';

import { filterableFields } from '../constants';
import {
  SET_SELECTED_FIELD,
  TOGGLE_SORT,
  SET_SEARCH,
} from '../actions/filterActions';

const initialState = {
  selectedField: filterableFields[0].key,
  sort: 'ASC',
  search: '',
};

const reducer = (state = initialState, action) => {
  if (action.type === SET_SELECTED_FIELD) {
    return produce(state, draft => {
      draft.selectedField = action.field;
    });
  }
  if (action.type === TOGGLE_SORT) {
    return produce(state, draft => {
      draft.sort = state.sort === 'ASC' ? 'DESC' : 'ASC';
    });
  }
  if (action.type === SET_SEARCH) {
    return produce(state, draft => {
      draft.search = action.search;
    });
  }
  return state;
};

export default reducer;
