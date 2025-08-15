import { apiSlice } from "./apiSlice";
const LOGS_URL = "/logs";

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

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
        { logId, fileName, renderOnly = false },
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

        if (!renderOnly) {
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = `${fileName}.xlsx`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(blobUrl);
          return { data: null };
        }

        const base64Data = await blobToBase64(blob);
        return { data: base64Data };
      },
    }),
    importLog: builder.mutation({
      query: (formData) => ({
        url: `${LOGS_URL}/import`,
        method: "POST",
        body: formData,
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
