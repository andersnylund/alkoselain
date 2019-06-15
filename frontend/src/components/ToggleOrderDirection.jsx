import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import Button from './Button';
import { toggleSortAction } from '../actions/filterActions';

const ToggleOrderDirection = () => {
  const sort = useSelector(state => state.filter.sort);
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(toggleSortAction())}>
      <Icon
        name={`sort content ${sort === 'ASC' ? 'ascending' : 'descending'}`}
      />
    </Button>
  );
};

export default ToggleOrderDirection;
