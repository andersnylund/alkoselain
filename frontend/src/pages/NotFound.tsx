import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link, RouteComponentProps } from '@reach/router';

import Button from '../components/common/Button';

const Container = styled.div`
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFound: FunctionComponent<RouteComponentProps> = () => (
  <Container>
    <h1>Tätä sivua ei löydy</h1>
    <Link to="/">
      <Button>Tästä takaisin etusivulle</Button>
    </Link>
  </Container>
);

export default NotFound;
