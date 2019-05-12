import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Item, Loader, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import produce from 'immer';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import Product from './Product';

const Wrapper = styled.section`
  max-width: 900px;
  margin: 2rem auto;
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

const ProductList = ({ selectedField, sort }) => {
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
              <Item.Group>
                {data.productsConnection.edges.map(edge => (
                  <Product key={edge.node.id} product={edge.node} />
                ))}
              </Item.Group>
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
                Lisää
              </Button>
            </>
          );
        }}
      </Query>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  selectedField: state.filter.selectedField,
  sort: state.filter.sort,
});

ProductList.propTypes = {
  selectedField: string.isRequired,
  sort: string.isRequired,
};

export default connect(mapStateToProps)(ProductList);
