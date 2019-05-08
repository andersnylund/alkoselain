import React from 'react';
import { shape, string, number } from 'prop-types';
import { Item } from 'semantic-ui-react';

const Product = ({ product }) => {
  return (
    <Item>
      <Item.Image
        src={`https://images.alko.fi/images/cs_srgb,f_auto,t_products/cdn/${
          product.id
        }/${product.nimi}.jpg`}
      />
      <Item.Content>
        <Item.Header>{product.nimi}</Item.Header>
        <Item.Meta>{product.valmistaja}</Item.Meta>
        <Item.Description>{product.luonnehdinta}</Item.Description>
        <Item.Extra>
          <p>{`Tyyppi: ${product.tyyppi}`}</p>
          <p>{`Hinta: ${product.hinta} €`}</p>
          {product.alkoholiprosentti !== null && (
            <p>{`Alkoholiprosentti: ${product.alkoholiprosentti} %`}</p>
          )}
          {product.alkoholilitrahinta !== null && (
            <p>{`Alkoholin litrahinta: ${product.alkoholilitrahinta} €`}</p>
          )}
          {product.pakkaustyyppi && (
            <p>{`Pakkaustyyppi: ${product.pakkaustyyppi}`}</p>
          )}
          {product.pakkaustyyppi && (
            <p>{`Pullon koko: ${product.pullokoko} litraa`}</p>
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

Product.propTypes = {
  product: shape({
    nimi: string.isRequired,
    valmistaja: string,
    luonnehdinta: string.isRequired,
    tyyppi: string.isRequired,
    hinta: number.isRequired,
    alkoholiprosentti: number,
    alkoholilitrahinta: number,
    pakkaustyyppi: string,
    pullokoko: number,
  }).isRequired,
};

export default Product;
