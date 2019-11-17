const SET_PAGE = 'SET_PAGE';

export type PageActions = typeof SET_PAGE;

export interface PageAction {
  type: PageActions;
  page: number;
}

export const setPageAction = (page: number): PageAction => ({
  type: 'SET_PAGE',
  page,
});
