import React from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

import ProductList from './components/ProductList';
import Background from './images/background.svg';
import Header from './components/Header';

const Wrapper = styled.div`
  background-image: url(${Background});
  min-height: 100vh;
`;

const StyledContainer = styled(Container)`
  padding: var(--size-8) 0;
`;

const App = () => (
  <Wrapper>
    <Header />
    <StyledContainer>
      <ProductList />
    </StyledContainer>
  </Wrapper>
);

export default App;
