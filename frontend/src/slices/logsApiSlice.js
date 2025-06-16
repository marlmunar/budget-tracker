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
    deleteLog: builder.mutation({
      query: ({ id }) => ({
        url: `${LOGS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    downloadLog: builder.mutation({
      queryFn: async (
        { logId, filename },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) => {
        const result = await fetchWithBQ({
          url: `${LOGS_URL}/download/${logId}`,
          method: "GET",
          responseHandler: (res) => res.blob(),
        });

        if (result.error) return { error: result.error };

        const blob = result.data;
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${filename}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(blobUrl);

        return { data: null };
      },
    }),
    importLog: builder.mutation({
      query: (data) => ({
        url: `${LOGS_URL}/import`,
        method: "POST",
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
  useDeleteLogMutation,
  useDownloadLogMutation,
  useImportLogMutation,
} = logsApiSlice;
