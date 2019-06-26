/* eslint-disable import/no-named-as-default */
import React from 'react';
import { string } from 'prop-types';

import SingleProduct from '../components/SingleProduct';

const Product = ({ productId }) => (
  <>
    <SingleProduct productId={productId} />
  </>
);

Product.propTypes = {
  productId: string,
};

Product.defaultProps = {
  productId: null,
};

export default Product;
