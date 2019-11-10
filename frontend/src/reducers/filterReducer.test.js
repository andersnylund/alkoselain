import deepFreeze from 'deep-freeze';

import filterReducer from './filterReducer';
import {
  setSearchAction,
  setSelectedCategoryAction,
  setSelectedFieldAction,
  toggleSortAction,
} from '../actions/filterActions';

describe('filterReducer.js', () => {
  it('should set initial state', () => {
    const state = filterReducer(undefined, { type: 'SOME_RANDOM_TYPE' });
    expect(state).toEqual({
      search: '',
      selectedCategory: '1',
      selectedField: 'alkoholilitrahinta',
      sort: 'ASC',
    });
  });

  it('should set the search field', () => {
    const state = deepFreeze(
      filterReducer(undefined, { type: 'SOME_RANDOM_TYPE' })
    );
    const nextState = deepFreeze(
      filterReducer(state, setSearchAction('search'))
    );
    expect(nextState).toEqual({
      search: 'search',
      selectedCategory: '1',
      selectedField: 'alkoholilitrahinta',
      sort: 'ASC',
    });
  });

  it('should set the selectedCategory', () => {
    const state = deepFreeze(
      filterReducer(undefined, { type: 'SOME_RANDOM_TYPE' })
    );
    const nextState = deepFreeze(
      filterReducer(state, setSelectedCategoryAction('categoryID'))
    );
    expect(nextState).toEqual({
      search: '',
      selectedCategory: 'categoryID',
      selectedField: 'alkoholilitrahinta',
      sort: 'ASC',
    });
  });

  it('should set the selectedField', () => {
    const state = deepFreeze(
      filterReducer(undefined, { type: 'SOME_RANDOM_TYPE' })
    );
    const nextState = deepFreeze(
      filterReducer(state, setSelectedFieldAction('fieldID'))
    );
    expect(nextState).toEqual({
      search: '',
      selectedCategory: '1',
      selectedField: 'fieldID',
      sort: 'ASC',
    });
  });

  it('should toggle the sort', () => {
    const state = deepFreeze(
      filterReducer(undefined, { type: 'SOME_RANDOM_TYPE' })
    );
    const nextState = deepFreeze(filterReducer(state, toggleSortAction()));
    expect(nextState).toEqual({
      search: '',
      selectedCategory: '1',
      selectedField: 'alkoholilitrahinta',
      sort: 'DESC',
    });
  });
});
