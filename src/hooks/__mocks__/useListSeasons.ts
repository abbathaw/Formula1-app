import { Season } from '../../types';

export const mockUseSeason = {
  seasons: [] as Season[],
  isLoading: false,
  isError: false,
};

const useListSeason = () => {
  return mockUseSeason;
};

export default useListSeason;
