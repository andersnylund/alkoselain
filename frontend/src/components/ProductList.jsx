import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Loader, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import produce from 'immer';
import { useSelector } from 'react-redux';

import Button from './Button';
import Product from './Product';

const Wrapper = styled.section`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const INDEX_QUERY = gql`
  query products(
    $endCursor: String
    $orderBy: ProductOrderByInput
    $where: ProductWhereInput
  ) {
    productsConnection(
      where: $where
      first: 5
      orderBy: $orderBy
      after: $endCursor
    ) {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          id
          nimi
          valmistaja
          pullokoko
          hinta
          litrahinta
          uutuus
          hinnastojarjestys
          tyyppi
          erityisryhma
          oluttyyppi
          valmistusmaa
          alue
          vuosikerta
          etikettimerkintoja
          huomautus
          rypaleet
          luonnehdinta
          pakkaustyyppi
          suljentatyyppi
          alkoholiprosentti
          hapot
          sokeri
          kantavierreprosentti
          vari
          ebc
          katkerot
          ebu
          energia
          valikoima
          alkoholilitrahinta
        }
      }
    }
  }
`;

const ProductList = () => {
  const selectedField = useSelector(state => state.filter.selectedField);
  const sort = useSelector(state => state.filter.sort);

  return (
    <Wrapper>
      <Query
        query={INDEX_QUERY}
        variables={{
          endCursor: null,
          orderBy: `${selectedField}_${sort}`,
          where: { [`${selectedField}_not`]: null },
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) {
            return <Loader active />;
          }
          if (error) {
            return <p>{error.message}</p>;
          }
          return (
            <>
              {data.productsConnection.edges.map(edge => (
                <Product key={edge.node.id} product={edge.node} />
              ))}
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      endCursor: data.productsConnection.pageInfo.endCursor,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return prev;
                      }
                      const nextState = produce(prev, draft => {
                        // eslint-disable-next-line no-param-reassign
                        draft.productsConnection.pageInfo.endCursor =
                          fetchMoreResult.productsConnection.pageInfo.endCursor;
                        draft.productsConnection.edges.push(
                          ...fetchMoreResult.productsConnection.edges
                        );
                      });

                      return nextState;
                    },
                  });
                }}
              >
                <Icon name="plus" />
                Lisää
              </Button>
            </>
          );
        }}
      </Query>
    </Wrapper>
  );
};

export default ProductList;
