/* eslint-disable import/no-named-as-default */
import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';

import SingleProduct from '../components/SingleProduct';

const ProductContainer = posed(styled.div`
  display: flex;
  justify-content: center;
  margin: calc(var(--size-8) * -1) var(--size-5) var(--size-5);
`)({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
});

const Product = ({ productId }) => (
  <ProductContainer>
    <SingleProduct productId={productId} />
  </ProductContainer>
);

Product.propTypes = {
  productId: string,
};

Product.defaultProps = {
  productId: null,
};

export default Product;
