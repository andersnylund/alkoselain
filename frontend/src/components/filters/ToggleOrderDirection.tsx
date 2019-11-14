import React, { FunctionComponent } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Button from '../common/Button';
import { toggleSortAction } from '../../actions/filterActions';
import { AppState } from '../../store';

interface Props {
  sort: string; // TODO: ASC DESC
  toggleSort: () => void;
}

export const ToggleOrderDirection: FunctionComponent<Props> = ({ sort, toggleSort }) => {
  const name = sort === 'ASC' ? 'sort content ascending' : 'sort content descending';
  return (
    <Button onClick={() => toggleSort()} data-testid="toggle-sort-button">
      <Icon name={name} />
    </Button>
  );
};

const mapStateToProps = (state: AppState) => ({
  sort: state.filter.sort,
});

const mapDispatchToProps = {
  toggleSort: toggleSortAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleOrderDirection);
