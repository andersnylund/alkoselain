import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from 'react-apollo/test-utils';

import { SingleProduct } from './SingleProduct';

describe('<SingleProduct />', () => {
  afterEach(cleanup);

  it('should render without any error', () => {
    render(<SingleProduct productId="123" />);
  });

  it('should show a loading indicator when loading the product', () => {
    render(
      <MockedProvider addTypename={false}>
        <SingleProduct productId="123" />
      </MockedProvider>
    );
  });
});
