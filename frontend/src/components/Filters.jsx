import React from 'react';
import styled from 'styled-components';

import SelectField from './SelectField';
import ToggleOrderDirection from './ToggleOrderDirection';
import SearchField from './SearchField';
import CategorySelect from './CategorySelect';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: var(--size-5);
  padding: var(--size-5);
  max-width: var(--size-14);
  .filter-item {
    margin: var(--size-3);
  }
`;

const Filters = () => (
  <Wrapper>
    <div className="filter-item">
      <SelectField />
    </div>
    <div className="filter-item">
      <ToggleOrderDirection />
    </div>
    <div className="filter-item">
      <CategorySelect />
    </div>
    <div className="filter-item">
      <SearchField />
    </div>
  </Wrapper>
);

export default Filters;
