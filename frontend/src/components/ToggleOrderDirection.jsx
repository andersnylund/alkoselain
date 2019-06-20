import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';

import Button from './Button';
import { toggleSortAction } from '../actions/filterActions';

export const ToggleOrderDirection = ({ sort, toggleSort }) => {
  return (
    <Button onClick={() => toggleSort()} data-testid="toggle-sort">
      <Icon
        name={`sort content ${sort === 'ASC' ? 'ascending' : 'descending'}`}
      />
    </Button>
  );
};

ToggleOrderDirection.propTypes = {
  sort: string.isRequired,
  toggleSort: func.isRequired,
};

const mapStateToProps = state => ({
  sort: state.filter.sort,
});

const mapDispatchToProps = {
  toggleSort: toggleSortAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleOrderDirection);
