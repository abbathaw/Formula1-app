import { fetcher } from '../api/fetcher.ts';
import useSWR from 'swr';
import { F1DriverStandingsResponse } from '../types/ApiResponses.ts';
import { BASE_URL, seasonStandingsAPI } from '../api/endpoints.ts';

function useSeasonStandings(year: string) {
  const { data, error, isLoading } = useSWR<F1DriverStandingsResponse>(
    `${BASE_URL}${seasonStandingsAPI(year)}`,
    fetcher,
  );

  return {
    season: data?.MRData,
    isLoading,
    isError: error,
  };
}

export default useSeasonStandings;
