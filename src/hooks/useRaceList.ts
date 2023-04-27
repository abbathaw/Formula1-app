import { F1RaceResultsResponse, Race, ReducedRaceResults } from '../types';
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

  /**
   *   this complicated reduce function is due to the structure the API is returning the data
   *   (the totalResults refer to a nested array of results, and not the outer results array.
   *   I opted to reduce this to an object and group them by round number as I was getting duplicated object results between each paginated results array
   */
  const raceList = data
    ? data?.reduce((prev, curr) => {
        curr?.MRData.RaceTable.Races.forEach((race) => {
          if (race.round) {
            if (!prev[race.round]) {
              prev[race.round] = {
                race: {} as Omit<Race, 'Results'>,
                results: [],
              };
            }
            const raceObject = { ...race };
            delete raceObject['Results'];
            prev[race.round]['race'] = prev[race.round]
              ? { ...prev[race.round]['race'], ...raceObject }
              : { ...raceObject };
            prev[race.round]['results'] = [...prev[race.round]['results'], ...(race.Results || [])];
          }
        });
        return prev;
      }, {} as ReducedRaceResults)
    : {};

  return {
    raceList,
    isLoading,
    isError: error,
  };
}

export default useRaceList;
