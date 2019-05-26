import React from 'react';

import styled from 'styled-components';

import Title from './Title';
import Filters from './Filters';

const Wrapper = styled.div`
  background-image: linear-gradient(
    to right,
    rgb(225, 210, 210),
    rgb(255, 240, 240)
  );
  padding: 0 0 var(--size-5);
  box-shadow: var(--box-shadow-2xl);
`;

const Header = () => (
  <Wrapper>
    <Title />
    <Filters />
  </Wrapper>
);

export default Header;
