import React from 'react';

import styled from 'styled-components';

import Title from './Title';

const Wrapper = styled.div`
  background-image: linear-gradient(
    to right,
    hsl(0, 50%, 85%),
    hsl(0, 50%, 70%)
  );
  padding: 0 0 var(--size-8);
  box-shadow: var(--box-shadow-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = () => (
  <Wrapper>
    <Title />
  </Wrapper>
);

export default Header;
