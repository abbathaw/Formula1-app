import { renderHook, waitFor } from '@testing-library/react';
import useSWRInfinite from 'swr/infinite';
import useSeasonStandings from './useSeasonStandings';
import { DriverStanding } from '../types';
import { describe, expect, MockedFunction, vi } from 'vitest';

vi.mock('swr/infinite', async () => {
  const useSWRInfinite = vi.fn();
  return { default: useSWRInfinite };
});

describe('useSeasonStandings Hook', () => {
  const mockedUseSWRInfinite = useSWRInfinite as unknown as MockedFunction<typeof useSWRInfinite>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns season standings data', async () => {
    const mockData = [
      {
        MRData: {
          StandingsTable: {
            StandingsLists: [
              {
                DriverStandings: [
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
                ],
              },
            ],
          },
        },
      },
    ];
    // const useSWRInfiniteMocked = (await vi.importActual<typeof import('swr/infinite')>('swr/infinite'));

    mockedUseSWRInfinite.mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
      size: 1,
      setSize: vi.fn(),
      mutate: vi.fn(),
      isValidating: false,
    });

    const { result } = renderHook(() => useSeasonStandings('2005'));

    await waitFor(() => {
      expect(useSWRInfinite).toHaveBeenCalledTimes(1);
    });

    const expectedSeasonStandings: DriverStanding[] = [
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
    ];

    expect(result.current.seasonStandings).toEqual(expectedSeasonStandings);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(undefined);
  });
});
