import { Race, F1RaceResultsResponse } from '../types/ApiResponses.ts';
import { BASE_URL, seasonRaceListAPI } from '../api/endpoints.ts';
import { getKey } from '../api/paginationKey.ts';
import useSWRInfinite from 'swr/infinite';
import { useCallback, useEffect } from 'react';

function useRaceList(year: string) {
  // The API here is paging the limit based on the number of results inside each races, so use an adjusted higher limit for less API calls
  const modifiedPageLimit = 100;
  const keyLoader = getKey(`${BASE_URL}${seasonRaceListAPI(year)}`, modifiedPageLimit);
  const { data, error, isLoading, size, setSize } = useSWRInfinite<F1RaceResultsResponse>(keyLoader, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    parallel: true,
  });

  const isLoadingInitialData = !error && !data;
  const isEmpty = data?.[0].MRData.RaceTable.Races.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      Number(data[data.length - 1]?.MRData.total) < modifiedPageLimit + Number(data[data.length - 1]?.MRData.offset));
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

  const raceList = data
    ? data?.reduce((prev, curr) => {
        prev = [...prev, ...(curr?.MRData.RaceTable.Races || [])];
        return prev;
      }, [] as Race[])
    : [];

  return {
    raceList,
    isLoading,
    isError: error,
  };
}

export default useRaceList;
