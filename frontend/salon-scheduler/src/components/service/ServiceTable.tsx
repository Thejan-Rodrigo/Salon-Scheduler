import type { Service } from "@/features/service/types";

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

import { Button } from "@/components/ui/button";

import {
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { useDeleteServiceMutation } from "@/features/service/serviceApi";

interface Props {
    services: Service[];
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
}

export default function ServiceTable({
    services,
    onEdit,
}: Props) {
    const [deleteService] = useDeleteServiceMutation();

    const handleDelete = async (id: string) => {

        try {
            await deleteService(id).unwrap();
        } catch (err) {
            console.error(err);
            alert("Failed to delete service.");
        }
    };
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px] text-center">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {services.map((service) => (
                    <TableRow key={service.id}>
                        <TableCell>{service.name}</TableCell>

                        <TableCell className="max-w-xs truncate">
                            {service.description}
                        </TableCell>

                        <TableCell>
                            {service.duration} mins
                        </TableCell>

                        <TableCell>
                            Rs. {service.price}
                        </TableCell>

                        <TableCell>
                            {service.isActive
                                ? "Active"
                                : "Inactive"}
                        </TableCell>

                        <TableCell className="text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">

                                    <DropdownMenuItem
                                        onClick={() =>
                                            onEdit(service)
                                        }
                                    >
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => handleDelete(service.id)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
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