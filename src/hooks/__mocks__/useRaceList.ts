import { ReducedRaceResults } from '../../types';

export const mockUseRaceList = {
  raceList: {} as ReducedRaceResults,
  isLoading: false,
  isError: false,
};

const useRaceList = () => {
  return mockUseRaceList;
};

export default useRaceList;
