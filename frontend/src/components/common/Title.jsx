import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import 'typeface-roboto-slab';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  h1 {
    font-family: 'Roboto Slab', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 800;
    font-size: var(--size-8);
    color: var(--grey-2);
    text-shadow: 1px 1px 2px hsl(0, 50%, 10%);

    @media (max-width: 600px) {
      font-size: var(--size-7);
    }

    @media (max-width: 400px) {
      font-size: var(--size-6);
    }
  }
`;

const Title = () => (
  <Link to="/">
    <Container>
      <h1>
        <span role="img" aria-label="wine glass">
          🍷
        </span>
        &nbsp; Alkoselain
      </h1>
    </Container>
  </Link>
);

export default Title;
