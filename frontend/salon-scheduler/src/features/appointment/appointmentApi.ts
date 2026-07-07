import { api } from "@/services/api";

import type { Appointment } from "./types";

import type { CreateAppointmentRequest } from "@/features/appointment/types";

export const appointmentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query<Appointment[], void>({
            query: () => ({
                url: "appointment/all",
                method: "GET",
            }),

            providesTags: ["Appointment"],
        }),
        createAppointment: builder.mutation<
            void,
            CreateAppointmentRequest
        >({
            query: (body) => ({
                url: "/appointment",
                method: "POST",
                data: body,
            }),

            invalidatesTags: ["Appointment"],
        }),
    }),
});

export const {
    useGetAppointmentsQuery,
    useCreateAppointmentMutation,
} = appointmentApi;