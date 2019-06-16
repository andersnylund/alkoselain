import React from 'react';
import styled from 'styled-components';

import SelectField from './SelectField';
import ToggleOrderDirection from './ToggleOrderDirection';
import SearchField from './SearchField';
import CategorySelect from './CategorySelect';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: var(--size-5);
  padding: var(--size-5);
  max-width: var(--size-14);
  .upper {
    display: grid;
    grid-template-columns: 8fr 1fr;
    grid-gap: var(--size-5);
    margin: var(--size-5) 0;
  }
  .lower {
    margin-bottom: var(--size-5);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--size-5);
  }
`;

const Filters = () => (
  <Wrapper>
    <div className="upper">
      <SelectField />
      <ToggleOrderDirection />
    </div>
    <div className="lower">
      <CategorySelect />
      <SearchField />
    </div>
  </Wrapper>
);

export default Filters;
