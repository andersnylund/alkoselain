import React, { useState, useEffect } from 'react';
import { Search } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import { setSearchAction } from '../../actions/filterActions';

// Hook from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchAction(debouncedSearchTerm));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <Search
      showNoResults={false}
      value={searchTerm}
      onSearchChange={e => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchField;
