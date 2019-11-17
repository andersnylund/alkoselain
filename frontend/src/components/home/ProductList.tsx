import React, { useEffect, FC } from 'react';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import posed from 'react-pose';

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
  getProducts: (page: number) => void;
  isLoading: boolean;
  products?: ProductType[];
  page: number;
}

export const ProductList: FC<Props> = ({ getProducts, isLoading, products, page }) => {
  useEffect(() => {
    getProducts(page);
  }, [getProducts, page]);

  if (isLoading || !products) {
    return <Loader active />;
  }

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
  page: state.page.page,
});

const mapDispatchToProps = {
  getProducts: getProductsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
