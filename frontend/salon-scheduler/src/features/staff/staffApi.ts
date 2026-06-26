import { api } from "@/services/api";

import type { Staff } from "./types";

export const staffApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<Staff[], void>({
      query: () => ({
        url: "/staff",
        method: "GET",
      }),

      providesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetStaffQuery,
} = staffApi;