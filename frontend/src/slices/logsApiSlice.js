import { apiSlice } from "./apiSlice";
const LOGS_URL = "/logs";

export const logsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: () => LOGS_URL,
    }),
    createLog: builder.mutation({
      query: (data) => ({
        url: LOGS_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLazyGetLogsQuery, useCreateLogMutation } = logsApiSlice;
