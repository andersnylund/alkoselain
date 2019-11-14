import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SelectField } from './SelectField';
import { filterableFields } from '../../constants';

describe('<SelectField />', () => {
  afterEach(cleanup);

  it('should render without an error', () => {
    const mockSetSelected = jest.fn();
    render(
      <SelectField selectedField={filterableFields[0].key} setSelectedField={mockSetSelected} />
    );
  });

  it('should have the first field selected by default', () => {
    const mockSetSelected = jest.fn();
    const { getAllByText } = render(
      <SelectField selectedField={filterableFields[0].key} setSelectedField={mockSetSelected} />
    );
    const fields = getAllByText('Alkoholin litrahinta');
    expect(fields[0]).toHaveTextContent('Alkoholin litrahinta');
  });

  it('should change the selected field', () => {
    const mockSetSelected = jest.fn();
    const { getByText } = render(
      <SelectField selectedField="alkoholinlitrahinta" setSelectedField={mockSetSelected} />
    );
    const hintaField = getByText('Hinta');
    fireEvent.click(hintaField);
    expect(mockSetSelected).toHaveBeenCalledWith('hinta');
  });
});
