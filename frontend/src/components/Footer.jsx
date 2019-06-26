import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  text-align: center;
  && {
    margin-bottom: var(--size-4);
  }
`;

const Footer = () => (
  <P>
    Made with&nbsp;
    <span role="img" aria-label="love">
      🧡&nbsp;
    </span>
    and&nbsp;
    <span role="img" aria-label="beer">
      🍺&nbsp;
    </span>
    by&nbsp;
    <a href="https://github.com/andersnylund/">Anders Nylund</a>
  </P>
);

export default Footer;
