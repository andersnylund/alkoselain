import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import ProductList from './components/ProductList';

const App = () => (
  <Container>
    <Header size="huge">
      <span role="img" aria-label="drunk">
        🥴
      </span>
      &nbsp; Billifyllo
    </Header>
    <ProductList />
  </Container>
);

export default App;
