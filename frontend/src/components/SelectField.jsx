import React from 'react';
import { Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';

import { filterableFields } from '../constants';
import { setSelectedFieldAction } from '../actions/filterActions';

const options = filterableFields.map(field => ({
  key: field.key,
  text: field.value,
  value: field.key,
}));

export const SelectField = ({ selectedField, setSelectedField }) => (
  <Select
    value={selectedField}
    options={options}
    onChange={(event, { value }) => setSelectedField(value)}
  />
);

SelectField.propTypes = {
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
)(SelectField);
