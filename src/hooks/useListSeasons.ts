import useSWR from 'swr';
import { F1SeasonsResponse } from '../types/ApiResponses.ts';
import { BASE_URL, seasonListAPI } from '../api/endpoints.ts';

function useSeason() {
  const { data, error, isLoading } = useSWR<F1SeasonsResponse>(`${BASE_URL}${seasonListAPI()}`);

  const seasons = [...(data?.MRData.SeasonTable.Seasons || [])].reverse();

  return {
    seasons: seasons,
    isLoading,
    isError: error,
  };
}

export default useSeason;
