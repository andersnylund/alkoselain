import React from 'react';
import styled from 'styled-components';

import SelectField from './SelectField';
import ToggleOrderDirection from './ToggleOrderDirection';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-gap: var(--size-5);
  max-width: var(--size-13);
  margin: 0 auto;
`;

const Filters = () => (
  <Wrapper>
    <SelectField />
    <ToggleOrderDirection />
  </Wrapper>
);

export default Filters;
