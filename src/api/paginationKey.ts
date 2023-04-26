import { SWRInfiniteKeyLoader } from 'swr/infinite';

export const PAGE_SIZE = 30;
export const getKey: (url: string, pageSize?: number) => SWRInfiniteKeyLoader =
  (url: string, pageSize?: number) => (pageIndex: number, previousPageData) => {
    if (previousPageData && !previousPageData.MRData) return null;
    const limit = pageSize || PAGE_SIZE;
    return `${url}?limit=${limit}&offset=${pageIndex * limit}`;
  };
