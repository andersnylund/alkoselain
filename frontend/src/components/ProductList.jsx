import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Loader, Icon, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import produce from 'immer';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import Button from './Button';
import Product from './Product';
import { titleCase } from '../helpers';

const Wrapper = styled.section`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PRODUCT_QUERY = gql`
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
          tyyppi {
            tyyppi
          }
          luonnehdinta
          pakkaustyyppi
          alkoholiprosentti
          alkoholilitrahinta
        }
      }
    }
  }
`;

export const createWhere = (selectedField, search, selectedCategory) => {
  const where = {
    [`${selectedField}_not`]: null,
    OR: [
      // TODO fix hack
      { nimi_contains: search },
      { nimi_contains: search.toUpperCase() },
      { nimi_contains: search.toLowerCase() },
      { nimi_contains: titleCase(search) },
      { luonnehdinta_contains: search },
      { luonnehdinta_contains: search.toUpperCase() },
      { luonnehdinta_contains: search.toLowerCase() },
      { luonnehdinta_contains: titleCase(search) },
      { tyyppi: { tyyppi_contains: search } },
      { tyyppi: { tyyppi_contains: search.toUpperCase() } },
      { tyyppi: { tyyppi_contains: search.toLowerCase() } },
      { tyyppi: { tyyppi_contains: titleCase(search) } },
      { valmistaja_contains: search },
      { valmistaja_contains: search.toUpperCase() },
      { valmistaja_contains: search.toLowerCase() },
      { valmistaja_contains: titleCase(search) },
    ],
  };

  if (selectedCategory !== 1) {
    where.tyyppi = {
      id: selectedCategory,
    };
  }
  return where;
};

export const ProductList = ({
  selectedField,
  selectedCategory,
  sort,
  search,
}) => {
  const variables = {
    endCursor: null,
    orderBy: `${selectedField}_${sort}`,
    where: createWhere(selectedField, search, selectedCategory),
  };
  return (
    <Wrapper>
      <Query query={PRODUCT_QUERY} variables={variables}>
        {({ data, loading, error, fetchMore }) => {
          if (loading) {
            return <Loader active data-testid="loader" />;
          }
          if (error) {
            return <Message negative>{error.message}</Message>;
          }
          return (
            <>
              {data.productsConnection.edges.map(edge => (
                <Product key={edge.node.id} product={edge.node} />
              ))}
              {data.productsConnection.pageInfo.endCursor && (
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
              )}
            </>
          );
        }}
      </Query>
    </Wrapper>
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
});

export default connect(mapStateToProps)(ProductList);
