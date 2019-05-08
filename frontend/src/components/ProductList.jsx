import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Item, Loader, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import produce from 'immer';

import Product from './Product';

const Wrapper = styled.section`
  max-width: 900px;
  margin: 2rem auto;
`;

const INDEX_QUERY = gql`
  query products($after: String) {
    productsConnection(
      where: { alkoholilitrahinta_not: null }
      first: 5
      orderBy: alkoholilitrahinta_ASC
      after: $after
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
  return (
    <Wrapper>
      <Query query={INDEX_QUERY} variables={{ cursor: null }}>
        {({ data, loading, error, fetchMore }) => {
          if (loading) {
            return <Loader active />;
          }
          if (error) {
            return <p>{error}</p>;
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
                      after: data.productsConnection.pageInfo.endCursor,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return prev;
                      }
                      const nextState = produce(prev, draft => {
                        draft.productsConnection.edges.push(
                          ...fetchMoreResult.productsConnection.edges
                        );
                      });

                      return nextState;
                    },
                  });
                }}
              >
                Lisää halpaa viinaa
              </Button>
            </>
          );
        }}
      </Query>
    </Wrapper>
  );
};

export default ProductList;
