import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

function App() {
  return (
    <Query query={INDEX_QUERY}>
      {({ data, loading, error }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>{error}</p>;
        }
        return (
          <div className="App">
            {data.productsConnection.edges.map(edge => {
              return <p>{edge.node.nimi}</p>;
            })}
          </div>
        );
      }}
    </Query>
  );
}

export default App;
