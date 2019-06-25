import React from 'react';
import styled from 'styled-components';

import 'typeface-varela-round';

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  h1 {
    font-family: 'Varela Round', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 800;
    font-size: var(--size-8);
    color: var(--grey-3);
    text-shadow: 1px 1px 3px hsl(0, 100%, 10%);

    @media (max-width: 600px) {
      font-size: var(--size-7);
    }

    @media (max-width: 400px) {
      font-size: var(--size-6);
    }
  }
`;

const Title = () => {
  return (
    <Wrapper>
      <h1>
        <span role="img" aria-label="wine glass">
          🍷
        </span>
        &nbsp; Alkoselain
      </h1>
    </Wrapper>
  );
};

export default Title;
