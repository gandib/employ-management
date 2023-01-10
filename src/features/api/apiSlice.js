import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://employ-management-server.vercel.app',
    }),
    tagTypes: ['Jobs', 'Job'],
    endpoints: (builder) => ({}),
});

export default apiSlice;