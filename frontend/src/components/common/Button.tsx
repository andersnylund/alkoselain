import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

const Button = styled.button`
  background-color: hsl(0, 100%, 90%);
  padding: var(--size-4);
  border-radius: var(--size-2);
  border: none;
  :focus {
    background-color: hsl(0, 100%, 85%);
  }
  :hover {
    background-color: hsl(0, 100%, 85%);
    cursor: pointer;
  }
`;

const PosedButton = posed(Button)({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    translateX: -5,
  },
  press: {
    scale: 0.8,
  },
});

export default (props: any) => {
  return <PosedButton {...props} />;
};
