import React, { FunctionComponent } from 'react';
import { Select } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { filterableFields } from '../../constants';
import { setSelectedFieldAction } from '../../actions/filterActions';
import { AppState } from '../../store';

interface Props {
  selectedField: string;
  setSelectedField: (value: string) => void;
}

const options = filterableFields.map(field => ({
  key: field.key,
  text: field.value,
  value: field.key,
}));

export const SelectField: FunctionComponent<Props> = ({ selectedField, setSelectedField }) => (
  <Select
    value={selectedField}
    options={options}
    onChange={(event, { value }) => setSelectedField(value as string)}
  />
);

const mapStateToProps = (state: AppState) => ({
  selectedField: state.filter.selectedField,
});

const mapDispatchToProps = {
  setSelectedField: setSelectedFieldAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectField);
