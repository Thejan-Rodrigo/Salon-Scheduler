import { api } from "@/services/api";

import type { Customer } from "./types";

export const customerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<Customer[], void>({
            query: () => ({
                url: "/customers",
            }),

            providesTags: ["Customer"],
        }),
    }),
});

export const {
    useGetCustomersQuery,
} = customerApi;