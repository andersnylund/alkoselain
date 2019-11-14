/* eslint-disable import/no-named-as-default */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import SingleProduct from '../components/singleproduct/SingleProduct';
import { RouteComponentProps } from '@reach/router';
import { Loader } from 'semantic-ui-react';

const ProductContainer = posed(styled.div`
  display: flex;
  justify-content: center;
  margin: calc(var(--size-8) * -1) var(--size-5) var(--size-5);
`)({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
});

interface Props
  extends RouteComponentProps<{
    productId: string | undefined;
  }> {}

const Product: FunctionComponent<Props> = ({ productId }) => {
  if (!productId) {
    return <Loader active />;
  }

  return (
    <ProductContainer>
      <SingleProduct productId={productId} />
    </ProductContainer>
  );
};

export default Product;
