import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Item } from 'semantic-ui-react';
import styled from 'styled-components';

import Product from './Product';

const Wrapper = styled.section`
  max-width: 900px;
  margin: 2rem auto;
`;

const INDEX_QUERY = gql`
  query products {
    productsConnection(
      where: { alkoholilitrahinta_not: null }
      first: 5
      orderBy: alkoholilitrahinta_ASC
    ) {
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
      <Query query={INDEX_QUERY}>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>{error}</p>;
          }
          return (
            <Item.Group>
              {data.productsConnection.edges.map(edge => (
                <Product key={edge.node.id} product={edge.node} />
              ))}
            </Item.Group>
          );
        }}
      </Query>
    </Wrapper>
  );
};

export default ProductList;
