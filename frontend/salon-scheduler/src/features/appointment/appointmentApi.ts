import { api } from "@/services/api";

import type { Appointment } from "./types";

export const appointmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], void>({
      query: () => ({
        url: "appointment/all",
        method: "GET",
      }),

      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
} = appointmentApi;