import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import { ProductList, PRODUCT_QUERY, createWhere } from './ProductList';

describe('<ProductList />', () => {
  beforeEach(cleanup);

  it('should render without an error', () => {
    render(
      <MockedProvider>
        <ProductList
          selectedField="hinta"
          selectedCategory="1"
          search=""
          sort="ASC"
        />
      </MockedProvider>
    );
  });

  it('should show a loading indicator', () => {
    const { getByTestId } = render(
      <MockedProvider>
        <ProductList
          selectedField="hinta"
          selectedCategory="1"
          search=""
          sort="ASC"
        />
      </MockedProvider>
    );
    const loader = getByTestId('loader');
    expect(loader).toHaveAttribute('class', 'ui active loader');
  });

  it('should show an error message', async () => {
    const errorMock = {
      request: {
        query: PRODUCT_QUERY,
        variables: {
          endCursor: null,
          orderBy: 'hinta_ASC',
          where: createWhere('hinta', '', '1'),
        },
      },
      error: new Error('Testing error'),
    };

    const { getByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <ProductList
          selectedField="hinta"
          selectedCategory="1"
          search=""
          sort="ASC"
        />
      </MockedProvider>
    );

    await wait(0);

    expect(getByText('Network error: Testing error')).toHaveTextContent(
      'Network error: Testing error'
    );
  });
});
