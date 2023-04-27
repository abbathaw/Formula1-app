import YearCard from '../components/YearCard.tsx';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

describe('YearCard', () => {
  it('renders a year card with the correct year and link', () => {
    const year = '2005';
    render(
      <BrowserRouter>
        <YearCard year={year} />
      </BrowserRouter>,
    );

    const yearCardLink = screen.getByRole('link', { name: year });
    expect(yearCardLink).toHaveAttribute('href', `/season/${year}`);
  });
});
