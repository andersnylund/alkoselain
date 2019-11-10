import React, { useEffect } from 'react';
import { Loader, Icon, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import produce from 'immer';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import posed from 'react-pose';

import Button from '../common/Button';
import Product from './Product';
import { getProducts as getProductsAction } from '../../actions/productActions';

const Container = styled.section`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PosedContainer = posed(Container)({
  enter: { staggerChildren: 10 },
});

const PosedItem = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 },
});

export const ProductList = ({
  selectedField,
  selectedCategory,
  sort,
  search,
  getProducts,
  isLoading,
  products,
}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (isLoading) {
    return <Loader active />;
  }

  return (
    <PosedContainer>
      {products.map(product => (
        <PosedItem key={product.id}>
          <Product product={product} />
        </PosedItem>
      ))}
    </PosedContainer>
  );
};

ProductList.propTypes = {
  selectedField: string.isRequired,
  selectedCategory: string.isRequired,
  sort: string.isRequired,
  search: string.isRequired,
};

const mapStateToProps = state => ({
  selectedField: state.filter.selectedField,
  selectedCategory: state.filter.selectedCategory,
  sort: state.filter.sort,
  search: state.filter.search,
  isLoading: state.product.isLoading,
  products: state.product.products,
});

const mapDispatchToProps = {
  getProducts: getProductsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
