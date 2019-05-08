import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';

import { filterableFields } from '../constants';
import { setSelectedFieldAction } from '../actions/filterActions';

const Filters = ({ selectedField, setSelectedField }) => {
  return (
    <Menu>
      {Object.keys(filterableFields).map(field => (
        <Menu.Item
          key={field}
          name={field}
          active={selectedField === field}
          onClick={(e, { name }) => setSelectedField(name)}
        >
          {filterableFields[field]}
        </Menu.Item>
      ))}
    </Menu>
  );
};

Filters.propTypes = {
  selectedField: string.isRequired,
  setSelectedField: func.isRequired,
};

const mapStateToProps = state => ({
  selectedField: state.filter.selectedField,
});

const mapDispatchToProps = {
  setSelectedField: setSelectedFieldAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
