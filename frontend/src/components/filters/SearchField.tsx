import React, { useState, useEffect } from 'react';
import { Search } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchAction } from '../../actions/filterActions';
import { AppState } from '../../store';

// Hook from https://usehooks.com/useDebounce/
function useDebounce(value: any, delay: number) {
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
  const search = useSelector((state: AppState) => state.filter.search);
  const [searchTerm, setSearchTerm] = useState(search);
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
      onSearchChange={(event, data) => setSearchTerm(data.value as string)}
    />
  );
};

export default SearchField;
