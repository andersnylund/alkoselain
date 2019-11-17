import { PageAction } from '../actions/pageActions';

export interface PageState {
  page: number;
}

const initialState: PageState = {
  page: 1,
};

export const pageReducer = (state = initialState, action: PageAction): PageState => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        page: action.page,
      };
    default:
      return state;
  }
};
