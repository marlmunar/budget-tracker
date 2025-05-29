import { apiSlice } from "./apiSlice";
const LOGS_URL = "/logs";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: () => LOGS_URL,
    }),
  }),
});

export const { useGetLogsQuery } = usersApiSlice;
