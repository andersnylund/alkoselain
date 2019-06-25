import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { ToggleOrderDirection } from './ToggleOrderDirection';

describe('<ToggleOrderDirection />', () => {
  afterEach(cleanup);

  it('should render without an error', () => {
    const mockToggleSort = jest.fn();
    render(<ToggleOrderDirection sort="ASC" toggleSort={mockToggleSort} />);
  });

  it('should be clickable and sort ascending', () => {
    const mockToggleSort = jest.fn();
    const { getByTestId } = render(
      <ToggleOrderDirection sort="ASC" toggleSort={mockToggleSort} />
    );
    const button = getByTestId('toggle-sort-button');
    fireEvent.click(button);
    expect(mockToggleSort).toHaveBeenCalled();
    expect(button).toMatchSnapshot();
  });

  it('should sort descending', async () => {
    const mockToggleSort = jest.fn();
    const { getByTestId } = render(
      <ToggleOrderDirection sort="DESC" toggleSort={mockToggleSort} />
    );
    const button = getByTestId('toggle-sort-button');
    expect(button).toMatchSnapshot();
  });
});
