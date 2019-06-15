import React from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

import ProductList from './components/ProductList';
import Background from './images/background.svg';
import Header from './components/Header';
import Filters from './components/Filters';

const Page = styled.div`
  background-image: url(${Background});
  min-height: 100vh;

  a {
    color: hsl(0, 50%, 50%);
  }

  p {
    text-align: center;
    margin-bottom: var(--size-4);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .filters {
    margin-top: -4rem;
    box-shadow: var(--box-shadow-md);
    border-radius: var(--size-5);
  }
`;

const ProductContainer = styled(Container)`
  padding: var(--size-8) 0;
`;

const App = () => (
  <Page>
    <Header />
    <Content>
      <div className="filters">
        <Filters />
      </div>
      <ProductContainer>
        <ProductList />
      </ProductContainer>
    </Content>
    <p>
      Made with&nbsp;
      <span role="img" aria-label="love">
        🧡
      </span>
      and&nbsp;
      <span role="img" aria-label="beer">
        🍺
      </span>
      by&nbsp;
      <a href="https://github.com/andersnylund/">Anders Nylund</a>
    </p>
  </Page>
);

export default App;
