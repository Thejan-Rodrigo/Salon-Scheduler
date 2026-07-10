import type { Appointment } from "@/features/appointment/types";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";

interface Props {
    appointments: Appointment[];

    onEdit: (appointment: Appointment) => void;

    onDelete: (appointment: Appointment) => void;
}

export default function AppointmentTable({
    appointments,
    onEdit,
    onDelete,
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
                    <TableHead className="w-[70px]">Actions</TableHead>
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
                            Rs. {appointment.price}
                        </TableCell>

                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => onEdit(appointment)}
                                    >
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => onDelete(appointment)}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}