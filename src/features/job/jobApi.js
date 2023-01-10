import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                url: "/job",
                method: "POST",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            invalidatesTags: ['Jobs'],
        }),
        apply: builder.mutation({
            query: (data) => ({
                url: "/apply",
                method: "PATCH",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            invalidatesTags: ['Jobs'],
        }),
        close: builder.mutation({
            query: (data) => ({
                url: "/close",
                method: "PATCH",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
        }),
        question: builder.mutation({
            query: (data) => ({
                url: "/query",
                method: "PATCH",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            invalidatesTags: ["Job"],
        }),
        chatQuestion: builder.mutation({
            query: (data) => ({
                url: "/chatquery",
                method: "PATCH",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            invalidatesTags: ["Job"],
        }),
        approval: builder.mutation({
            query: (data) => ({
                url: "/approval",
                method: "PATCH",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            invalidatesTags: ["Job"],
        }),
        reply: builder.mutation({
            query: (data) => ({
                url: "/reply",
                method: "PATCH",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            invalidatesTags: ["Job"],
        }),
        chatReply: builder.mutation({
            query: (data) => ({
                url: "/chatreply",
                method: "PATCH",
                body: data,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            invalidatesTags: ["Job"],
        }),
        getJobs: builder.query({
            query: () => ({
                url: "/jobs",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            providesTags: ['Jobs'],
        }),
        getAppliedJobs: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            providesTags: ['Job']
        }),
        jobById: builder.query({
            query: (id) => ({
                url: `job/${id}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
            providesTags: ["Job"],
        }),
        userByEmail: builder.query({
            query: (email) => ({
                url: `/user/${email}`,
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            }),
        }),
    }),
});

export const { usePostJobMutation, useJobByIdQuery, useGetJobsQuery, useApplyMutation, useGetAppliedJobsQuery, useQuestionMutation, useReplyMutation, useUserByEmailQuery, useCloseMutation, useChatQuestionMutation, useChatReplyMutation, useApprovalMutation } = jobApi;