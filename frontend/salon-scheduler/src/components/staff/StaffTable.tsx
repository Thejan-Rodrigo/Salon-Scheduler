import type { Staff } from "@/features/staff/types";

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
  staff: Staff[];
  onEdit: (staff: Staff) => void;
}

export default function StaffTable({staff, onEdit,}: Props) {

  const handleDelete = (staffId: string) => {
    console.log("Delete", staffId);

    // Show confirmation dialog here
  };

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
          <TableHead className="w-[80px] text-right">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {staff.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.firstName}</TableCell>

            <TableCell>{member.lastName}</TableCell>

            <TableCell>{member.email}</TableCell>

            <TableCell>{member.phone}</TableCell>

            <TableCell>{member.role}</TableCell>

            <TableCell>
              {member.isActive ? "Active" : "Inactive"}
            </TableCell>

            <TableCell className="text-right">
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
                    onClick={() => onEdit(member)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 focus:text-red-600"
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