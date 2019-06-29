import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import { CategorySelect, CATEGORY_QUERY } from './CategorySelect';

describe('<CategorySelect />', () => {
  afterEach(cleanup);

  it('should render without an error', () => {
    const setSelectedCategoryMock = jest.fn();
    render(
      <MockedProvider>
        <CategorySelect
          selectedCategory=""
          setSelectedCategory={setSelectedCategoryMock}
        />
      </MockedProvider>
    );
  });

  it('should show an empty select when loading', () => {
    const setSelectedCategoryMock = jest.fn();

    const categoryMock = {
      request: {
        query: CATEGORY_QUERY,
      },
      result: {
        data: {},
      },
    };

    const { container } = render(
      <MockedProvider mocks={[categoryMock]}>
        <CategorySelect
          selectedCategory=""
          setSelectedCategory={setSelectedCategoryMock}
        />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should show an empty select when loading', async () => {
    const setSelectedCategoryMock = jest.fn();

    const categoryMock = {
      request: {
        query: CATEGORY_QUERY,
      },
      error: new Error('Testing error'),
    };

    const { container } = render(
      <MockedProvider mocks={[categoryMock]}>
        <CategorySelect
          selectedCategory=""
          setSelectedCategory={setSelectedCategoryMock}
        />
      </MockedProvider>
    );

    await wait(0);

    expect(container).toMatchSnapshot();
  });

  it('should list the different categories', async () => {
    const setSelectedCategoryMock = jest.fn();

    const categoryMock = {
      request: {
        query: CATEGORY_QUERY,
      },
      result: {
        data: {
          categories: [
            {
              id: '2',
              tyyppi: 'tyyppi2',
            },
            {
              id: '3',
              tyyppi: 'tyyppi3',
            },
          ],
        },
      },
    };

    const { container } = render(
      <MockedProvider mocks={[categoryMock]} addTypename={false}>
        <CategorySelect
          selectedCategory=""
          setSelectedCategory={setSelectedCategoryMock}
        />
      </MockedProvider>
    );

    await wait(0);

    expect(container).toMatchSnapshot();
  });
});
