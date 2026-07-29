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
        createCustomer: builder.mutation<
            void,
            Omit<Customer, "id">
        >({
            query: (body) => ({
                url: "/customers",
                method: "POST",
                data: body,
            }),

            invalidatesTags: ["Customer"],
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useCreateCustomerMutation,
} = customerApi;