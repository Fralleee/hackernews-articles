import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useState, useEffect } from 'react';

const useLoadMore = <T>(useGetQuery: UseQuery<any>, { ...params }) => {
  const [activePage, setActivePage] = useState(0);
  const [aggregatedHits, setAggregatedHits] = useState<T[]>([]);
  const queryResponse = useGetQuery({ page: activePage, ...params });
  const { hits = [], totalHits = 0, page = 0, totalPages = 0 } = (queryResponse?.data as ListResponse<T>) || {};

  useEffect(() => {
    if (hits.length !== 0) {
      if (activePage === 0) setAggregatedHits(hits);
      else if (activePage === page) setAggregatedHits(prevState => [...prevState, ...hits]);
    }
  }, [hits, activePage, page]);

  const canLoadMore = activePage < totalPages;
  const loadMore = () => canLoadMore && setActivePage(page => page + 1);
  const reset = () => setActivePage(0);

  return {
    data: { hits: aggregatedHits, totalHits, page, totalPages },
    error: queryResponse?.error,
    isLoading: queryResponse?.isLoading,
    canLoadMore,
    reset,
    loadMore
  };
};

export default useLoadMore;
