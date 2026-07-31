import { useNavigate } from "react-router-dom";
import CustomerTable from "@/components/customer/CustomerTable";

import { useGetCustomersQuery } from "@/features/customer/customerApi";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/routePaths";

export default function CustomerPage() {
    const navigate = useNavigate();
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Customer Management
                    </h1>

                    <p className="text-muted-foreground">
                        Manage salon customers.
                    </p>
                </div>
                <Button
                    onClick={() => navigate(ROUTES.ADD_CUSTOMER)}
                >
                    Add Customer
                </Button>
            </div>

            <CustomerTable customers={customers} />
        </div>
    );
}