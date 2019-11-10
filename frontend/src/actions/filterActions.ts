export const SET_SELECTED_FIELD = 'SET_SELECTED_FIELD';
export const TOGGLE_SORT = 'TOGGLE_SORT';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

export interface FilterAction {
  type: string;
  field?: string;
  search?: string;
  category?: string;
}

export const setSelectedFieldAction = (field: string): FilterAction => ({
  type: SET_SELECTED_FIELD,
  field,
});

export const toggleSortAction = () => ({
  type: TOGGLE_SORT,
});

export const setSearchAction = (search: string): FilterAction => ({
  type: SET_SEARCH,
  search,
});

export const setSelectedCategoryAction = (category: string): FilterAction => ({
  type: SET_SELECTED_CATEGORY,
  category,
});
