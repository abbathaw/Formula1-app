import { render, screen, within } from '@testing-library/react';
import RaceCard from '../components/RaceCard';
import { SeasonWinnerContext } from '../contexts/WinnerContext';
import { describe, expect } from 'vitest';

describe('RaceCard Component', () => {
  test('renders race information and highlights the winner', () => {
    const race = {
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
    };

    const results = [
      {
        number: '1',
        position: '1',
        positionText: '1',
        points: '25',
        Driver: {
          driverId: 'test-driver-1',
          permanentNumber: '1',
          code: 'TES',
          url: 'http://example.com/test-driver-1',
          givenName: 'John',
          familyName: 'Doe',
          dateOfBirth: '1980-01-01',
          nationality: 'American',
        },
        Constructor: {
          constructorId: 'team1',
          url: 'http://example.com/team1',
          name: 'Team 1',
          nationality: 'American',
        },
        grid: '1',
        laps: '50',
        status: 'Finished',
        Time: {
          millis: '3600000',
          time: '1:00:00.000',
        },
        FastestLap: {
          rank: '1',
          lap: '5',
          Time: {
            time: '1:30.000',
          },
          AverageSpeed: {
            units: 'kph',
            speed: '200.0',
          },
        },
      },
      {
        number: '2',
        position: '2',
        positionText: '2',
        points: '18',
        Driver: {
          driverId: 'test-driver-2',
          permanentNumber: '2',
          code: 'TES',
          url: 'http://example.com/test-driver-2',
          givenName: 'Jane',
          familyName: 'Doe',
          dateOfBirth: '1980-01-01',
          nationality: 'American',
        },
        Constructor: {
          constructorId: 'team2',
          url: 'http://example.com/team2',
          name: 'Team 2',
          nationality: 'British',
        },
        grid: '1',
        laps: '50',
        status: 'Finished',
        Time: {
          millis: '3600000',
          time: '1:00:00.000',
        },
        FastestLap: {
          rank: '1',
          lap: '5',
          Time: {
            time: '1:30.000',
          },
          AverageSpeed: {
            units: 'kph',
            speed: '200.0',
          },
        },
      },
    ];

    const winnerId = 'test-driver-1';

    render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <SeasonWinnerContext.Provider value={{ winnerId, setWinnerId: () => {} }}>
        <RaceCard race={race} results={results} />
      </SeasonWinnerContext.Provider>,
    );

    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.getByText('Circuit 1 - 2005-01-01')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Team 1')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();

    const winnerRow = screen.getByText('John Doe').closest('.winner-row');
    expect(winnerRow).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Team 2')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();

    const position2Row = screen.getByText('Jane Doe').closest('.driver-row');
    const { queryByTestId } = within(position2Row as HTMLElement);
    const winnerRow2 = queryByTestId('winner-row');
    expect(winnerRow2).not.toBeInTheDocument();
  });
});
