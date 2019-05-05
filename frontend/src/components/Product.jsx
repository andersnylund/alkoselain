import React from 'react';
import { shape, string } from 'prop-types';
import { Card } from 'semantic-ui-react';

const Product = ({ product }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{product.nimi}</Card.Header>
        <Card.Description>{product.luonnehdinta}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{`Hinta: ${product.hinta} €`}</Card.Meta>
        <Card.Meta>
          {`Alkoholin litrahinta: ${product.alkoholilitrahinta} €`}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

Product.propTypes = {
  product: shape({
    nimi: string.isRequired,
  }).isRequired,
};

export default Product;
