import type { Staff } from "@/features/staff/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  staff: Staff[];
}

export default function StaffTable({
  staff,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {staff.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              {member.firstName}
            </TableCell>

            <TableCell>
              {member.lastName}
            </TableCell>

            <TableCell>
              {member.email}
            </TableCell>

            <TableCell>
              {member.phone}
            </TableCell>

            <TableCell>
              {member.role}
            </TableCell>

            <TableCell>
              {member.isActive
                ? "Active"
                : "Inactive"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}