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
                url: "/appointments",
            }),

            providesTags: ["Appointment"],
        }),

        createAppointment: builder.mutation<
            Appointment,
            CreateAppointmentRequest
        >({
            query: (body) => ({
                url: "/appointments",
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
                url: `/appointments/${id}`,
                method: "PUT",
                data: body,
            }),

            invalidatesTags: ["Appointment"],
        }),

        deleteAppointment: builder.mutation<void, string>({
            query: (id) => ({
                url: `/appointments/${id}`,
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