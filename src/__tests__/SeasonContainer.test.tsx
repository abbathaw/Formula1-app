import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SeasonContainer from '../components/SeasonContainer.tsx';
import Layout from '../layout';
import SeasonList from '../components/SeasonList.tsx';
import { describe, expect, vi } from 'vitest';

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

vi.mock('../components/SeasonWinners');
vi.mock('../components/RaceList');

describe('SeasonContainer Component', () => {
  test('renders season container with correct year', () => {
    const testYear = '2008';

    render(
      <MemoryRouter initialEntries={[`/season/${testYear}`]}>
        <HelmetProvider>
          <WrapperComponent />
        </HelmetProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(testYear)).toBeInTheDocument();
    expect(screen.getByText('Champions')).toBeInTheDocument();
    expect(screen.getByText('Rounds and Winners')).toBeInTheDocument();
  });
});
