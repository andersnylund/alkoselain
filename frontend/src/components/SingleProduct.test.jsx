import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from 'react-apollo/test-utils';

import { SingleProduct } from './SingleProduct';

describe('<SingleProduct />', () => {
  afterEach(cleanup);

  it('should render without any error', () => {
    render(
      <MockedProvider addTypename={false}>
        <SingleProduct productId="123" />
      </MockedProvider>
    );
  });

  it('should show a loading indicator when loading the product', () => {
    render(
      <MockedProvider addTypename={false}>
        <SingleProduct productId="123" />
      </MockedProvider>
    );

    // TODO test loading indicator
  });

  // TODO test showing the product
});
