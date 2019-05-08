/* eslint-disable no-param-reassign */
import produce from 'immer';

import { filterableFields } from '../constants';
import { SET_SELECTED_FIELD } from '../actions/filterActions';

const initialState = {
  selectedField: filterableFields.alkoholilitrahinta,
};

const reducer = (state = initialState, action) => {
  if (action.type === SET_SELECTED_FIELD) {
    return produce(state, draft => {
      draft.selectedField = action.field;
    });
  }
  return state;
};

export default reducer;
