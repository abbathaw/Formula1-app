import { SWRInfiniteKeyLoader } from 'swr/infinite';

export const PAGE_SIZE = 30;
export const getKey: (url: string) => SWRInfiniteKeyLoader = (url: string) => (pageIndex: number, previousPageData) => {
  if (previousPageData && !previousPageData.MRData) return null;
  return `${url}?limit=${PAGE_SIZE}&offset=${pageIndex * PAGE_SIZE}`;
};
