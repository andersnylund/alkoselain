import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

import ProductList from '../components/home/ProductList';
import Filters from '../components/filters/Filters';
import { RouteComponentProps } from '@reach/router';
import Button from '../components/common/Button';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { setPageAction } from '../actions/pageActions';

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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

interface Props extends RouteComponentProps {
  page: number;
  setPage: (page: number) => void;
}

const Index: FunctionComponent<Props> = ({ page, setPage }) => (
  <Content>
    {/* use styled(Filters) */}
    <div className="filters">
      <Filters />
    </div>
    <ProductListContainer>
      <ProductList />
      <ButtonContainer>
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          ←
        </Button>
        Sivu {page}
        <Button onClick={() => setPage(page + 1)}>→</Button>
      </ButtonContainer>
    </ProductListContainer>
  </Content>
);

const mapStateToProps = (state: AppState) => ({
  page: state.page.page,
});

const mapDispatchToProps = {
  setPage: setPageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
