import { F1RaceResultsResponse, RaceResult } from '../types/ApiResponses.ts';
import { BASE_URL, raceStandingsAPI } from '../api/endpoints.ts';
import { getKey, PAGE_SIZE } from '../api/paginationKey.ts';
import useSWRInfinite from 'swr/infinite';
import { useCallback, useEffect } from 'react';

function useRaceList(year: string, round: string) {
  const keyLoader = getKey(`${BASE_URL}${raceStandingsAPI(year, round)}`);
  const { data, error, isLoading, size, setSize } = useSWRInfinite<F1RaceResultsResponse>(keyLoader, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    parallel: true,
  });

  const isLoadingInitialData = !error && !data;
  const isEmpty = data?.[0].MRData.RaceTable.Races[0]?.Results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.MRData.RaceTable.Races?.[0]?.Results.length < PAGE_SIZE);
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const loadMoreItems = useCallback(() => {
    if (isLoadingMore || isReachingEnd) {
      return;
    }

    return new Promise<void>((resolve) => {
      setSize((size) => size + 1);
      resolve();
    });
  }, [isLoadingMore, isReachingEnd, setSize]);

  useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);

  const raceResults = data
    ? data?.reduce((prev, curr) => {
        prev = [...prev, ...(curr?.MRData.RaceTable.Races?.[0]?.Results || [])];
        return prev;
      }, [] as RaceResult[])
    : [];

  return {
    raceResults,
    isLoading,
    isError: error,
  };
}

export default useRaceList;
