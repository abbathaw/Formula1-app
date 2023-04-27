import { render, screen } from '@testing-library/react';
import SeasonWinners from '../components/SeasonWinners';
import { mockUseSeasonStandings } from '../hooks/__mocks__/useSeasonStandings';
import { SeasonWinnerContext } from '../contexts/WinnerContext';
import { describe, expect, vi } from 'vitest';

vi.mock('../hooks/useSeasonStandings.ts');

describe('SeasonWinners Component', () => {
  test('renders season winners with correct data', () => {
    const testYear = '2005';
    const mockSetWinnerId = vi.fn();

    mockUseSeasonStandings.seasonStandings = [
      {
        position: '1',
        positionText: '1',
        points: '100',
        wins: '5',
        Driver: {
          driverId: 'test-driver-1',
          url: 'http://example.com/test-driver-1',
          givenName: 'John',
          familyName: 'Doe',
          dateOfBirth: '1980-01-01',
          nationality: 'American',
        },
        Constructors: [],
      },
      {
        position: '2',
        positionText: '2',
        points: '90',
        wins: '4',
        Driver: {
          driverId: 'test-driver-2',
          url: 'http://example.com/test-driver-2',
          givenName: 'Jane',
          familyName: 'Doe',
          dateOfBirth: '1985-01-01',
          nationality: 'British',
        },
        Constructors: [],
      },
      {
        position: '3',
        positionText: '3',
        points: '80',
        wins: '3',
        Driver: {
          driverId: 'test-driver-3',
          url: 'http://example.com/test-driver-3',
          givenName: 'Jim',
          familyName: 'Smith',
          dateOfBirth: '1990-01-01',
          nationality: 'Australian',
        },
        Constructors: [],
      },
      {
        position: '4',
        positionText: '4',
        points: '70',
        wins: '2',
        Driver: {
          driverId: 'test-driver-4',
          url: 'http://example.com/test-driver-4',
          givenName: 'Not',
          familyName: 'Winning',
          dateOfBirth: '1990-01-01',
          nationality: 'Moon',
        },
        Constructors: [],
      },
    ];

    render(
      <SeasonWinnerContext.Provider value={{ winnerId: '', setWinnerId: mockSetWinnerId }}>
        <SeasonWinners year={testYear} />
      </SeasonWinnerContext.Provider>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('100 points')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('90 points')).toBeInTheDocument();
    expect(screen.getByText('Jim Smith')).toBeInTheDocument();
    expect(screen.getByText('80 points')).toBeInTheDocument();
    expect(screen.queryByText('Not Winning')).not.toBeInTheDocument();

    expect(mockSetWinnerId).toHaveBeenCalledWith('test-driver-1');
  });
});
