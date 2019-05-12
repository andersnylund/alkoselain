import React from 'react';
import styled from 'styled-components';

import SelectField from './SelectField';
import ToggleOrderDirection from './ToggleOrderDirection';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-gap: 1rem;
  max-width: 20rem;
  margin: 0 auto;
`;

const Filters = () => (
  <Wrapper>
    <SelectField />
    <ToggleOrderDirection />
  </Wrapper>
);

export default Filters;
