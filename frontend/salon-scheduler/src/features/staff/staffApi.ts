import { api } from "@/services/api";

import type { Staff, CreateStaffRequest } from "./types";

export const staffApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<Staff[], void>({
      query: () => ({
        url: "/staff",
      }),
      providesTags: ["Staff"],
    }),

    createStaff: builder.mutation<void, CreateStaffRequest>({
      query: (body) => ({
        url: "/staff",
        method: "POST",
        data: body,
      }),

      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useCreateStaffMutation,
} = staffApi;