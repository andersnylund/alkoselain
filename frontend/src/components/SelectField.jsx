import React from 'react';
import { Select } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { filterableFields } from '../constants';
import { setSelectedFieldAction } from '../actions/filterActions';

const options = filterableFields.map(field => ({
  key: field.key,
  text: field.value,
  value: field.key,
}));

const Filters = () => {
  const selectedField = useSelector(state => state.filter.selectedField);
  const dispatch = useDispatch();

  return (
    <Select
      value={selectedField}
      options={options}
      onChange={(event, { value }) => dispatch(setSelectedFieldAction(value))}
    />
  );
};

export default Filters;
