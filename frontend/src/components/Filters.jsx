import React from 'react';
import styled from 'styled-components';

import SelectField from './SelectField';
import ToggleOrderDirection from './ToggleOrderDirection';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-gap: 1rem;
`;

const Filters = () => (
  <Wrapper>
    <SelectField />
    <ToggleOrderDirection />
  </Wrapper>
);

export default Filters;
