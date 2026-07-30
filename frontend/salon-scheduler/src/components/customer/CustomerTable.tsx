import { useState } from "react";
import type { Customer } from "@/features/customer/types";
import { useDeleteCustomerMutation } from "@/features/customer/customerApi";
import EditCustomerDialog from "./EditCustomerDialog";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
    customers: Customer[];
}

export default function CustomerTable({
    customers,
}: Props) {
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const handleDelete = async (customerId: string) => {
        if (!customerId) return;
        try {
            await deleteCustomer(customerId).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px] text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.firstName}</TableCell>
                            <TableCell>{customer.lastName}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phoneNumber}</TableCell>
                            <TableCell>
                                {customer.isActive ? "Active" : "Inactive"}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setEditingCustomer(customer)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleDelete(customer.id)}
                                            className="text-red-600 focus:text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            {isDeleting ? "Deleting..." : "Delete"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <EditCustomerDialog
                open={!!editingCustomer}
                onOpenChange={(open) => !open && setEditingCustomer(null)}
                customer={editingCustomer}
            />
        </>
    );
}