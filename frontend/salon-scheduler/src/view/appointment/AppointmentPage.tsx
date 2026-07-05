import AppointmentTable from "@/components/appointment/AppointmentTable";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import type { Appointment } from "@/features/appointment/types";

export default function AppointmentPage() {

const mockAppointments: Appointment[] = [
  {
    id: "1",
    customerName: "John Doe",
    staffName: "Emma Wilson",
    serviceName: "Hair Cut",
    appointmentDate: "2026-07-05",
    startTime: "09:00 AM",
    endTime: "09:45 AM",
    status: "Confirmed",
    paymentStatus: "Paid",
    price: 2500,
  },
  {
    id: "2",
    customerName: "Sarah Smith",
    staffName: "Michael Brown",
    serviceName: "Hair Coloring",
    appointmentDate: "2026-07-05",
    startTime: "10:30 AM",
    endTime: "12:00 PM",
    status: "Pending",
    paymentStatus: "Pending",
    price: 6000,
  },
  {
    id: "3",
    customerName: "David Johnson",
    staffName: "Emma Wilson",
    serviceName: "Beard Trim",
    appointmentDate: "2026-07-06",
    startTime: "01:00 PM",
    endTime: "01:30 PM",
    status: "Completed",
    paymentStatus: "Paid",
    price: 1500,
  },
];
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

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Appointment
        </Button>

      </div>

      <AppointmentTable
        appointments={mockAppointments}
      />

    </div>
  );
}