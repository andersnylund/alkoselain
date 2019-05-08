/* eslint-disable no-param-reassign */
import produce from 'immer';

import { filterableFields } from '../constants';
import { SET_SELECTED_FIELD, TOGGLE_SORT } from '../actions/filterActions';

const initialState = {
  selectedField: filterableFields[0],
  sort: 'ASC',
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
  return state;
};

export default reducer;
