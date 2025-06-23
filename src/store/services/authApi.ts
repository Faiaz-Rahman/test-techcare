import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from '..'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL!,
    prepareHeaders: headers => {
      const token = store.getState()?.auth?.user?.access_token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    },
  }),
  tagTypes: [],
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'get',
      }),
      providesTags: ['Profile' as never],
    }),
    postsSharedWithMe: builder.query({
      query: () => ({
        url: '/notes/shared-with-me',
        method: 'get',
      }),
      providesTags: ['SharedWithMe' as never],
    }),
  }),
})

export const { useGetProfileQuery, usePostsSharedWithMeQuery } = authApi
