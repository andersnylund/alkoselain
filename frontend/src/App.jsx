import React from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

import ProductList from './components/ProductList';
import Background from './images/background.svg';
import Header from './components/Header';

const Wrapper = styled.div`
  background-image: url(${Background});
`;

const App = () => (
  <Wrapper>
    <Header />
    <Container>
      <ProductList />
    </Container>
  </Wrapper>
);

export default App;
