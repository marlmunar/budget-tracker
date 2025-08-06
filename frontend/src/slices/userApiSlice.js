import { apiSlice } from "./apiSlice";
const USER_URL = "/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => `${USER_URL}/profile`,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/verify`,
        method: "POST",
        body: data,
      }),
    }),
    authenticate: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/authenticate`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLazyGetProfileQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateMutation,
  useVerifyMutation,
  useAuthenticateMutation,
} = usersApiSlice;
