import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { string, func, shape } from 'prop-types';

import { filterableFields } from '../constants';
import { setSelectedFieldAction } from '../actions/filterActions';

const Filters = ({ selectedField, setSelectedField }) => {
  return (
    <Menu>
      {filterableFields.map(field => (
        <Menu.Item
          key={field.key}
          name={field.key}
          active={selectedField.key === field.key}
          onClick={(e, { name }) =>
            setSelectedField(filterableFields.find(f => f.key === name))
          }
        >
          {field.value}
        </Menu.Item>
      ))}
    </Menu>
  );
};

Filters.propTypes = {
  selectedField: shape({
    key: string.isRequired,
    value: string.isRequired,
  }).isRequired,
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
