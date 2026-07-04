import { useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import ServiceTable from "@/components/service/ServiceTable";

import { useGetServicesQuery } from "@/features/service/serviceApi";

import { ROUTES } from "@/routes/routePaths";

export default function ServicePage() {
    const navigate = useNavigate();

    const {
        data: services = [],
        isLoading,
        error,
    } = useGetServicesQuery();

    if (isLoading) {
        return <div>Loading services...</div>;
    }

    if (error) {
        return <div>Failed to load services.</div>;
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Service Management
                    </h1>

                    <p className="text-muted-foreground">
                        Manage salon services.
                    </p>
                </div>

                <Button
                    onClick={() =>
                        navigate(ROUTES.ADD_SERVICE)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                </Button>

            </div>

            <ServiceTable services={services} />

        </div>
    );
}