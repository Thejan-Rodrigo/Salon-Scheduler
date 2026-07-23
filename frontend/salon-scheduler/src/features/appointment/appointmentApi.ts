import { api } from "@/services/api";

import type {
    Appointment,
    CreateAppointmentRequest,
    UpdateAppointmentRequest,
} from "./types";

export const appointmentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query<Appointment[], void>({
            query: () => ({
                url: "/appointment/all",
            }),

            providesTags: ["Appointment"],
        }),

        createAppointment: builder.mutation<
            Appointment,
            CreateAppointmentRequest
        >({
            query: (body) => ({
                url: "/appointment",
                method: "POST",
                data: body,
            }),

            invalidatesTags: ["Appointment"],
        }),

        updateAppointment: builder.mutation<
            Appointment,
            {
                id: string;
                body: UpdateAppointmentRequest;
            }
        >({
            query: ({ id, body }) => ({
                url: `/appointment/${id}`,
                method: "PUT",
                data: body,
            }),

            invalidatesTags: ["Appointment"],
        }),

        deleteAppointment: builder.mutation<void, string>({
            query: (id) => ({
                url: `/appointment/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Appointment"],
        }),
    }),
});

export const {
    useGetAppointmentsQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
} = appointmentApi;