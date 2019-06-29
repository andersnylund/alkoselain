import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import { ProductList, PRODUCTLIST_QUERY, createWhere } from './ProductList';

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
        query: PRODUCTLIST_QUERY,
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

  it('should not show any products', async () => {
    const productMock = {
      request: {
        query: PRODUCTLIST_QUERY,
        variables: {
          endCursor: null,
          orderBy: 'hinta_ASC',
          where: createWhere('hinta', '', '1'),
        },
      },
      result: {
        data: {
          productsConnection: {
            edges: [],
            pageInfo: {
              endCursor: null,
              startCursor: null,
            },
          },
        },
      },
    };

    const { queryByTestId } = render(
      <MockedProvider mocks={[productMock]} addTypename={false}>
        <ProductList
          selectedField="hinta"
          selectedCategory="1"
          search=""
          sort="ASC"
        />
      </MockedProvider>
    );

    await wait(0);

    expect(queryByTestId('product')).toBeNull();
  });

  it('should show a list of products', async () => {
    const productMock = {
      request: {
        query: PRODUCTLIST_QUERY,
        variables: {
          endCursor: null,
          orderBy: 'hinta_ASC',
          where: createWhere('hinta', '', '1'),
        },
      },
      result: {
        data: {
          productsConnection: {
            edges: [
              {
                node: {
                  id: '1',
                  nimi: 'nimi',
                  valmistaja: 'valmistaja',
                  pullokoko: 0.56,
                  hinta: 123,
                  litrahinta: 'litrahinta',
                  tyyppi: {
                    id: 'id',
                    tyyppi: 'tyyppi',
                  },
                  luonnehdinta: 'luonnehdinta',
                  pakkaustyyppi: 'pakkaustyyppi',
                  alkoholiprosentti: 3.1,
                  alkoholilitrahinta: 123.123,
                },
              },
            ],
            pageInfo: {
              endCursor: null,
              startCursor: null,
            },
          },
        },
      },
    };

    const { container } = render(
      <MockedProvider mocks={[productMock]} addTypename={false}>
        <ProductList
          selectedField="hinta"
          selectedCategory="1"
          search=""
          sort="ASC"
        />
      </MockedProvider>
    );

    await wait(0);

    expect(container).toMatchSnapshot();
  });
});
