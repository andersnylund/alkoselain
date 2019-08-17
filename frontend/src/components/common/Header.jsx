import React from 'react';

import styled from 'styled-components';

import Title from './Title';

const Wrapper = styled.div`
  padding: 0 0 var(--size-8);
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
