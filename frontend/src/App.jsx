import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';

import Background from './images/background.svg';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';

const Container = styled.div`
  background-image: url(${Background});
  min-height: 100vh;

  a {
    color: hsl(0, 50%, 50%);
  }
`;

const App = () => (
  <Container>
    <Header />
    <Router>
      <HomePage path="/" />
      <ProductPage path="/products/:productId" />
    </Router>
    <Footer />
  </Container>
);

export default App;
