import type { Customer } from "@/features/customer/types";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    customers: Customer[];
}

export default function CustomerTable({
    customers,
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell>
                            {customer.firstName}
                        </TableCell>

                        <TableCell>
                            {customer.lastName}
                        </TableCell>

                        <TableCell>
                            {customer.email}
                        </TableCell>

                        <TableCell>
                            {customer.phoneNumber}
                        </TableCell>

                        <TableCell>
                            {customer.isActive
                                ? "Active"
                                : "Inactive"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}