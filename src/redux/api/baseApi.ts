/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_API,
        prepareHeaders: (headers) => {
            headers.set("Authorization", import.meta.env.VITE_API_TOKEN)
            return headers
        },
    }),
    endpoints: (builder) => ({
        getCountries: builder.query<any, void>({
            query: () => "countries/list",
        }),
    }),
})


export const { useGetCountriesQuery } = baseApi;
