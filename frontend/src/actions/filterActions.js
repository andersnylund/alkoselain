export const SET_SELECTED_FIELD = 'SET_SELECTED_FIELD';
export const TOGGLE_SORT = 'TOGGLE_SORT';
export const SET_SEARCH = 'SET_SEARCH';

export const setSelectedFieldAction = field => ({
  type: SET_SELECTED_FIELD,
  field,
});

export const toggleSortAction = () => ({
  type: TOGGLE_SORT,
});

export const setSearchAction = search => ({
  type: SET_SEARCH,
  search,
});
