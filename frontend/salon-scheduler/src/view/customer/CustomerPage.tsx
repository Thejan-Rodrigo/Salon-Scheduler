import CustomerTable from "@/components/customer/CustomerTable";

import { useGetCustomersQuery } from "@/features/customer/customerApi";

export default function CustomerPage() {
    const {
        data: customers = [],
        isLoading,
        error,
    } = useGetCustomersQuery();

    if (isLoading) {
        return <div>Loading customers...</div>;
    }

    if (error) {
        return (
            <div>
                Failed to load customers.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Customer Management
                </h1>

                <p className="text-muted-foreground">
                    Manage salon customers.
                </p>
            </div>

            <CustomerTable customers={customers} />
        </div>
    );
}