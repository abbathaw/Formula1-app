import { render, screen } from '@testing-library/react';
import SeasonList from '../components/SeasonList.tsx';
import { mockUseSeason } from '../hooks/__mocks__/useListSeasons.ts';

import { describe, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import SeasonContainer from '../components/SeasonContainer.tsx';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('../hooks/useListSeasons.ts');

const WrapperComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SeasonList />} />
        <Route path="/season/:year" element={<SeasonContainer />} />
      </Route>
    </Routes>
  );
};

describe('SeasonList', () => {
  it('renders a list of seasons with YearCard components', () => {
    const seasons = [
      { season: '2005', url: 'http://example.com/season/2005' },
      { season: '2006', url: 'http://example.com/season/2006' },
    ];

    mockUseSeason.seasons = seasons;

    render(
      <MemoryRouter initialEntries={[`/`]}>
        <HelmetProvider>
          <WrapperComponent />
        </HelmetProvider>
      </MemoryRouter>,
    );

    seasons.forEach(({ season }) => {
      expect(screen.getByText(season)).toBeInTheDocument();
    });
  });
});
