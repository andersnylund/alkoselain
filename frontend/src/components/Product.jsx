import React from 'react';
import { shape, string, number } from 'prop-types';
import { Card } from 'semantic-ui-react';

const Product = ({ product }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{product.nimi}</Card.Header>
        <Card.Meta>{product.valmistaja}</Card.Meta>
        <Card.Description>{product.luonnehdinta}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{`Tyyppi: ${product.tyyppi}`}</Card.Meta>
        <Card.Meta>{`Hinta: ${product.hinta} €`}</Card.Meta>
        <Card.Meta>
          {`Alkoholiprosentti: ${product.alkoholiprosentti} %`}
        </Card.Meta>
        <Card.Meta>
          {`Alkoholin litrahinta: ${product.alkoholilitrahinta} €`}
        </Card.Meta>
        <Card.Meta>{`Pakkaustyyppi: ${product.pakkaustyyppi}`}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

Product.propTypes = {
  product: shape({
    nimi: string.isRequired,
    luonnehdinta: string.isRequired,
    hinta: number.isRequired,
    alkoholilitrahinta: number.isRequired,
    pakkaustyyppi: string.isRequired,
    tyyppi: string.isRequired,
    valmistaja: string.isRequired,
    alkoholiprosentti: number.isRequired,
  }).isRequired,
};

export default Product;
