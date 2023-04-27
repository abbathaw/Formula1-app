import { DriverStanding } from '../../types';

export const mockUseSeasonStandings = {
  seasonStandings: [] as DriverStanding[],
  isLoading: false,
  isError: false,
};

const useSeasonStandings = () => {
  return mockUseSeasonStandings;
};

export default useSeasonStandings;
