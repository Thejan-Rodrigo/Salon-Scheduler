import { api } from "@/services/api";

import type { Service } from "./types";
import type { CreateServiceRequest } from "@/features/service/types";
import type { UpdateServiceRequest } from "@/features/service/types";

export const serviceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<Service[], void>({
            query: () => ({
                url: "/service",
            }),

            providesTags: ["Service"],
        }),

        createService: builder.mutation<
            void,
            CreateServiceRequest
        >({
            query: (body) => ({
                url: "/service",
                method: "POST",
                data: body,
            }),

            invalidatesTags: ["Service"],
        }),

        updateService: builder.mutation<
            Service,
            UpdateServiceRequest
        >({
            query: ({ id, ...body }) => ({
                url: `/service/${id}`,
                method: "PUT",
                data: body,
            }),

            invalidatesTags: ["Service"],
        }),
    }),
});

export const {
    useGetServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
} = serviceApi;