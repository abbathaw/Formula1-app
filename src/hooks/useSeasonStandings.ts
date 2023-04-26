import { F1DriverStandingsResponse, DriverStanding } from '../types/ApiResponses.ts';
import { BASE_URL, seasonStandingsAPI } from '../api/endpoints.ts';
import { getKey, PAGE_SIZE } from '../api/paginationKey.ts';
import useSWRInfinite from 'swr/infinite';
import { useCallback, useEffect } from 'react';

function useSeasonStandings(year: string) {
  const keyLoader = getKey(`${BASE_URL}${seasonStandingsAPI(year)}`);
  const { data, error, isLoading, size, setSize } = useSWRInfinite<F1DriverStandingsResponse>(keyLoader, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    parallel: true,
  });

  const isLoadingInitialData = !error && !data;
  const isEmpty = data?.[0].MRData.StandingsTable.StandingsLists.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.MRData.StandingsTable.StandingsLists?.[0]?.DriverStandings?.length < PAGE_SIZE);
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

  const seasonStandings = data
    ? data?.reduce((prev, curr) => {
        prev = [...prev, ...(curr?.MRData.StandingsTable.StandingsLists[0].DriverStandings || [])];
        return prev;
      }, [] as DriverStanding[])
    : [];

  return {
    seasonStandings,
    isLoading,
    isError: error,
  };
}

export default useSeasonStandings;
