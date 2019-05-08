import React from 'react';
import { Container } from 'semantic-ui-react';

import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import ToggleOrderDirection from './components/ToggleOrderDirection';

const App = () => (
  <>
    <Navbar />
    <Container>
      <Filters />
      <ToggleOrderDirection />
      <ProductList />
    </Container>
  </>
);

export default App;
