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
        deleteCustomer: builder.mutation<void, string>({
            query: (id) => ({
                url: `/customers/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Customer"],
        }),
        updateCustomer: builder.mutation<
            Customer,
            Partial<Customer> & { id: string }
        >({
            query: ({ id, ...body }) => ({
                url: `/customers/${id}`,
                method: "PUT",
                data: body,
            }),

            invalidatesTags: ["Customer"],
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customerApi;