import type { Appointment } from "@/features/appointment/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  appointments: Appointment[];
}

export default function AppointmentTable({
  appointments,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Staff</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.customerName}</TableCell>

            <TableCell>{appointment.staffName}</TableCell>

            <TableCell>{appointment.serviceName}</TableCell>

            <TableCell>{appointment.appointmentDate}</TableCell>

            <TableCell>{appointment.startTime}</TableCell>

            <TableCell>{appointment.endTime}</TableCell>

            <TableCell>{appointment.status}</TableCell>

            <TableCell>{appointment.paymentStatus}</TableCell>

            <TableCell>
              Rs. {appointment.price.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}