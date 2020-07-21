import React from 'react';
import { render } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound Page', () => {
  it('should display not found text', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText(/not found/)).toBeInTheDocument();
  });
});
