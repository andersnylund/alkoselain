import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

import ProductList from '../components/home/ProductList';
import Filters from '../components/filters/Filters';
import { RouteComponentProps } from '@reach/router';
import PageButtons from '../components/home/PageButtons';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .filters {
    margin: calc(var(--size-6) * -1) var(--size-6) var(--size-6);
    box-shadow: var(--box-shadow-md);
    border-radius: var(--size-5);
  }
`;

const ProductListContainer = styled(Container)`
  padding: var(--size-8) 0;

  &&& {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Index: FunctionComponent<RouteComponentProps> = () => (
  <Content>
    {/* use styled(Filters) */}
    <div className="filters">
      <Filters />
    </div>
    <ProductListContainer>
      <PageButtons />
      <ProductList />
      <PageButtons />
    </ProductListContainer>
  </Content>
);

export default Index;
