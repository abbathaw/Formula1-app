import { render, screen } from '@testing-library/react';
import RaceList from '../components/RaceList';
import { mockUseRaceList } from '../hooks/__mocks__/useRaceList.ts';
import { describe, expect, vi } from 'vitest';

vi.mock('../hooks/useRaceList');

describe('RaceList Component', () => {
  test('renders RaceCard components with the provided race list', () => {
    const mockRaceList = {
      race1: {
        race: {
          season: '2005',
          round: '1',
          url: 'http://example.com/race1',
          raceName: 'Race 1',
          Circuit: {
            circuitId: 'circuit1',
            url: 'http://example.com/circuit1',
            circuitName: 'Circuit 1',
            Location: {
              lat: '0.0',
              long: '0.0',
              locality: 'City 1',
              country: 'Country 1',
            },
          },
          date: '2005-01-01',
          time: '12:00:00Z',
        },
        results: [],
      },
    };

    mockUseRaceList.isLoading = false;
    mockUseRaceList.isError = false;
    mockUseRaceList.raceList = mockRaceList;

    render(<RaceList year="2005" />);

    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.getByText('Circuit 1 - 2005-01-01')).toBeInTheDocument();
  });
});
