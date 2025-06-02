import { apiSlice } from "./apiSlice";
const LOGS_URL = "/logs";

export const logsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: () => LOGS_URL,
    }),
    getLog: builder.query({
      query: (id) => `${LOGS_URL}/${id}`,
    }),
    createLog: builder.mutation({
      query: (data) => ({
        url: LOGS_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateLog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${LOGS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLazyGetLogsQuery,
  useLazyGetLogQuery,
  useCreateLogMutation,
  useUpdateLogMutation,
} = logsApiSlice;
