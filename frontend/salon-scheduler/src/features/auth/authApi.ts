import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "@/services/axiosBaseQuery";

import type { AuthUser } from "@/types/auth.types";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    login: builder.mutation<
      AuthUser,
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = authApi;