/* eslint-disable import/no-named-as-default */
import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import SingleProduct from '../components/SingleProduct';

const Container = styled.section`
  display: flex;
  justify-content: center;
  margin: calc(var(--size-8) * -1) var(--size-8) var(--size-8);
  overflow: hidden;
`;

const Product = ({ productId }) => (
  <Container>
    <SingleProduct productId={productId} />
  </Container>
);

Product.propTypes = {
  productId: string,
};

Product.defaultProps = {
  productId: null,
};

export default Product;
