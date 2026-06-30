import { api } from "@/services/api";

import type { Staff, CreateStaffRequest, UpdateStaffRequest } from "./types";

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

    updateStaff: builder.mutation<Staff, UpdateStaffRequest>({
      query: ({ id, ...body }) => ({
        url: `/staff/${id}`,
        method: "PUT",
        data: body,
      }),

      invalidatesTags: ["Staff"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
} = staffApi;