import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
`;

const Navbar = () => {
  return (
    <Wrapper>
      <Header size="huge">
        <span role="img" aria-label="drunk">
          🥴
        </span>
        &nbsp; Billifyllo
      </Header>
    </Wrapper>
  );
};

export default Navbar;
