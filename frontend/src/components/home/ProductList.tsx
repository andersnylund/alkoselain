import React, { useEffect, FC } from 'react';
import { Loader, Message } from 'semantic-ui-react';
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
  getProducts: (page: number, category: string) => void;
  isLoading: boolean;
  isError: boolean;
  products?: ProductType[];
  page: number;
  category: string;
}

export const ProductList: FC<Props> = ({
  getProducts,
  isLoading,
  isError,
  products,
  page,
  category,
}) => {
  useEffect(() => {
    getProducts(page, category);
  }, [getProducts, page, category]);

  if (isLoading || !products) {
    return <Loader active />;
  }

  if (isError) {
    return <Message error={true}>Hups... jotakin meni pieleen!</Message>;
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
  isError: state.productList.isError,
  products: state.productList.products,
  page: state.page.page,
  category: state.filter.selectedCategory,
});

const mapDispatchToProps = {
  getProducts: getProductsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
