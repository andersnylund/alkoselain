import React from 'react';
import { Container } from 'semantic-ui-react';

import ProductList from './components/ProductList';
import Navbar from './components/Navbar';

const App = () => (
  <>
    <Navbar />
    <Container>
      <ProductList />
    </Container>
  </>
);

export default App;
