import AppointmentTable from "@/components/appointment/AppointmentTable";

import { useGetAppointmentsQuery } from "@/features/appointment/appointmentApi";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/routes/routePaths";

import { useDeleteAppointmentMutation } from "@/features/appointment/appointmentApi";

import type { Appointment } from "@/features/appointment/types"
import { useState } from "react";

export default function AppointmentPage() {
    const {
        data: appointments = [],
        isLoading,
        error,
    } = useGetAppointmentsQuery();

    const navigate = useNavigate();

    const [deleteAppointment] = useDeleteAppointmentMutation();


    const handleEdit = (
        appointment: Appointment
    ) => {
    };

    if (isLoading) {
        return <div>Loading appointments...</div>;
    }

    if (error) {
        return (
            <div>
                Failed to load appointments.
            </div>
        );
    }

    const handleDelete = async (appointment: Appointment) => {
        try {
            await deleteAppointment(appointment.id).unwrap();
        } catch (err) {
            console.error(err);
            alert("Failed to delete service.");
        }
    };

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Appointment Management
                    </h1>

                    <p className="text-muted-foreground">
                        Manage customer appointments.
                    </p>

                </div>

                <Button
                    onClick={() => navigate(ROUTES.ADD_APPOINTMENT)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Appointment
                </Button>

            </div>

            <AppointmentTable
                appointments={appointments}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

        </div>
    );
}