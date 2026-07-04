import { api } from "@/services/api";

import type { Service } from "./types";

export const serviceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<Service[], void>({
            query: () => ({
                url: "/service",
            }),

            providesTags: ["Service"],
        }),
    }),
});

export const {
    useGetServicesQuery,
} = serviceApi;