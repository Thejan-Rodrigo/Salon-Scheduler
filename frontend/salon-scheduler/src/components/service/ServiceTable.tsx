import type { Service } from "@/features/service/types";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    services: Service[];
}

export default function ServiceTable({
    services,
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {services.map((service) => (
                    <TableRow key={service.id}>
                        <TableCell>{service.name}</TableCell>

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
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}