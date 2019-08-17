import React from 'react';

import styled from 'styled-components';

import Title from './Title';

import { ReactComponent as Wave } from './header-wave.svg';

const Wrapper = styled.div`
  padding: 0 0 var(--size-8);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = () => (
  <Wrapper>
    <Wave />
    <Title />
  </Wrapper>
);

export default Header;
