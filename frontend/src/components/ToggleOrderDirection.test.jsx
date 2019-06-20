import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';

import { ToggleOrderDirection } from './ToggleOrderDirection';

describe('<ToggleOrderDirection />', () => {
  afterEach(cleanup);

  it('should render without an error', () => {
    const mockToggleSort = jest.fn();
    render(<ToggleOrderDirection sort="ASC" toggleSort={mockToggleSort} />);
  });

  it('should be clickable', () => {
    const mockToggleSort = jest.fn();
    const { getByTestId } = render(
      <ToggleOrderDirection sort="ASC" toggleSort={mockToggleSort} />
    );
    const button = getByTestId('toggle-sort');
    fireEvent.click(button);
    expect(mockToggleSort).toHaveBeenCalled();
  });

  it.skip('should toggle the sort', async () => {
    const mockToggleSort = jest.fn();
    const { getByTestId } = render(
      <ToggleOrderDirection sort="ASC" toggleSort={mockToggleSort} />
    );
    const button = getByTestId('toggle-sort');
    fireEvent.click(button);

    await waitForElement(() => getByTestId('toggle-sort'));
  });
});
