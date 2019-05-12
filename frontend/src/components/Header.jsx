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
  /* background-color: rgb(255, 240, 240); */
  padding: 0 0 2rem;
  box-shadow: 0px -60px 60px 30px rgba(15, 0, 0, 0.75);
`;

const Header = () => (
  <Wrapper>
    <Title />
    <Filters />
  </Wrapper>
);

export default Header;
