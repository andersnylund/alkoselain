import React from 'react';
import { Container } from 'semantic-ui-react';

import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Filters from './components/Filters';

const App = () => (
  <>
    <Navbar />
    <Container>
      <Filters />
      <ProductList />
    </Container>
  </>
);

export default App;
