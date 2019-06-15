import React from 'react';
import { Search } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { setSearchAction } from '../actions/filterActions';

const SearchField = () => {
  const search = useSelector(state => state.filter.search);
  const dispatch = useDispatch();

  return (
    <Search
      showNoResults={false}
      value={search}
      onSearchChange={e => dispatch(setSearchAction(e.target.value))}
    />
  );
};

export default SearchField;
