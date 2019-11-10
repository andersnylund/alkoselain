import React, { useEffect, FC } from 'react';
import { Loader, Icon, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import produce from 'immer';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import posed from 'react-pose';

import Button from '../common/Button';
import Product from './Product';
import { getProducts as getProductsAction } from '../../actions/productListActions';
import { AppState } from '../../store';
import { Product as ProductType } from '../../../../shared/types';

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

export interface Props {
  getProducts: () => void;
  isLoading: boolean;
  products?: ProductType[];
}

export const ProductList: FC<Props> = ({ getProducts, isLoading, products }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (isLoading || !products) {
    return <Loader active />;
  }

  // TODO: show error message

  return (
    <PosedContainer>
      {products.map((product: ProductType) => (
        <PosedItem key={product.id}>
          <Product product={product} />
        </PosedItem>
      ))}
    </PosedContainer>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.productList.isLoading,
  products: state.productList.products,
});

const mapDispatchToProps = {
  getProducts: getProductsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
