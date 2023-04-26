import { F1RacesResponse, Race } from '../types/ApiResponses.ts';
import { BASE_URL, seasonRaceListAPI } from '../api/endpoints.ts';
import { getKey, PAGE_SIZE } from '../api/paginationKey.ts';
import useSWRInfinite from 'swr/infinite';
import { useCallback, useEffect } from 'react';

function useRaceList(year: string) {
  const keyLoader = getKey(`${BASE_URL}${seasonRaceListAPI(year)}`);
  const { data, error, isLoading, size, setSize } = useSWRInfinite<F1RacesResponse>(keyLoader, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    parallel: true,
  });

  const isLoadingInitialData = !error && !data;
  const isEmpty = data?.[0].MRData.RaceTable.Races.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.MRData.RaceTable.Races.length < PAGE_SIZE);
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
