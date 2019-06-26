import React from 'react';
import gql from 'graphql-tag';
import { string } from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Loader, Message } from 'semantic-ui-react';

export const SINGLEPRODUCT_QUERY = gql`
  query product($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      nimi
      valmistaja
      pullokoko
      hinta
      litrahinta
      uutuus
      hinnastojarjestys
      tyyppi {
        id
        tyyppi
      }
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
      katkerot
      energia
      valikoima
    }
  }
`;

const Card = styled.div`
  background-color: white;
`;

const Image = styled.img`
  height: 200px;
`;

export const SingleProduct = ({ productId }) => (
  <Query query={SINGLEPRODUCT_QUERY} variables={{ where: { id: productId } }}>
    {({ data, loading, error }) => {
      if (loading) {
        return <Loader active />;
      }
      if (error) {
        return <Message error>{error.message}</Message>;
      }
      const { product } = data;
      return (
        <Card>
          <Image
            src={`https://images.alko.fi/images/cs_srgb,f_auto,t_medium/cdn/${
              product.id
            }/${product.nimi}.jpg`}
            alt={product.nimi}
          />
          <h2>{product.nimi}</h2>
          <h3>Perustiedot</h3>
          <table>
            <tbody>
              <tr>
                <td>Tuote ID</td>
                <td>{product.id}</td>
              </tr>
              <tr>
                <td>Nimi</td>
                <td>{product.nimi}</td>
              </tr>
              <tr>
                <td>Valmistaja</td>
                <td>{product.valmistaja}</td>
              </tr>
              <tr>
                <td>Pullokoko</td>
                <td>{`${product.pullokoko} l`}</td>
              </tr>
              <tr>
                <td>Hinta</td>
                <td>{`${product.hinta} €`}</td>
              </tr>
              <tr>
                <td>Litrahinta</td>
                <td>{`${product.litrahinta} €/l`}</td>
              </tr>
              <tr>
                <td>Uutuus</td>
                <td>{product.uutuus}</td>
              </tr>
              <tr>
                <td>Hinnastojärjestys</td>
                <td>{product.hinnastojarjestys}</td>
              </tr>
              <tr>
                <td>Tyyppi</td>
                <td>{product.tyyppi.tyyppi}</td>
              </tr>
              <tr>
                <td>Erityisryhmä</td>
                <td>{product.erityisryhma}</td>
              </tr>
              <tr>
                <td>Oluttyyppi</td>
                <td>{product.oluttyyppi}</td>
              </tr>
              <tr>
                <td>Valmistusmaa</td>
                <td>{product.valmistusmaa}</td>
              </tr>
              <tr>
                <td>Alue</td>
                <td>{product.alue}</td>
              </tr>
              <tr>
                <td>Vuosikerta</td>
                <td>{product.vuosikerta}</td>
              </tr>
              <tr>
                <td>Etikettimerkintöjä</td>
                <td>{product.etikettimerkintoja}</td>
              </tr>
              <tr>
                <td>Huomautus</td>
                <td>{product.huomautus}</td>
              </tr>
              <tr>
                <td>Rypäleet</td>
                <td>{product.rypaleet}</td>
              </tr>
              <tr>
                <td>Luonnehdinta</td>
                <td>{product.luonnehdinta}</td>
              </tr>
              <tr>
                <td>Pakkaustyyppi</td>
                <td>{product.pakkaustyyppi}</td>
              </tr>
              <tr>
                <td>Suljentatyyppi</td>
                <td>{product.suljentatyyppi}</td>
              </tr>
              <tr>
                <td>Alkoholiprosentti</td>
                <td>{`${product.alkoholiprosentti} %`}</td>
              </tr>
              <tr>
                <td>Hapot</td>
                <td>{`${product.hapot} g/l`}</td>
              </tr>
              <tr>
                <td>Sokeri</td>
                <td>{`${product.sokeri} g/l`}</td>
              </tr>
              <tr>
                <td>Kantavierreprosentti</td>
                <td>{`${product.kantavierreprosentti} %`}</td>
              </tr>
              <tr>
                <td>Väri EBC</td>
                <td>{product.vari}</td>
              </tr>
              <tr>
                <td>Katkerot EBC</td>
                <td>{product.katkerot}</td>
              </tr>
              <tr>
                <td>Energia kcal</td>
                <td>{product.energia}</td>
              </tr>
              <tr>
                <td>Valikoima</td>
                <td>{product.valikoima}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      );
    }}
  </Query>
);

SingleProduct.propTypes = {
  productId: string.isRequired,
};

export default SingleProduct;
