import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hackernewsApi = createApi({
  reducerPath: 'hackernewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hn.algolia.com/api/v1/' }),
  endpoints: builder => ({
    getArticles: builder.query<ListResponse<Article>, { searchValue: string; page?: number }>({
      query: ({ searchValue, page = 0 }) => `search?query=${searchValue}&tags=story&page=${page}`,
      transformResponse: ({ hits, nbHits, page, nbPages }) => ({ hits, totalHits: nbHits, page, totalPages: nbPages })
    }),
    getArticleById: builder.query<Article, string | undefined>({
      query: id => `items/${id}`
    })
  })
});
