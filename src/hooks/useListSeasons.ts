import useSWR from 'swr';
import { F1SeasonsResponse } from '../types/ApiResponses.ts';
import { BASE_URL, seasonListAPI } from '../api/endpoints.ts';

function useSeason() {
  const { data, error, isLoading } = useSWR<F1SeasonsResponse>(`${BASE_URL}${seasonListAPI()}`);

  return {
    seasons: data?.MRData,
    isLoading,
    isError: error,
  };
}

export default useSeason;
