import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';

import { toggleSortAction } from '../actions/filterActions';

const ToggleOrderDirection = ({ sort, toggleSort }) => {
  return (
    <Button
      icon={`sort content ${sort === 'ASC' ? 'ascending' : 'descending'}`}
      onClick={toggleSort}
    />
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
