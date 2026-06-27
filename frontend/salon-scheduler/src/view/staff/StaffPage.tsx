import StaffTable from "@/components/staff/StaffTable";
import { useGetStaffQuery } from "@/features/staff/staffApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ROUTES } from "@/routes/routePaths";

export default function StaffPage() {
  const navigate = useNavigate();

  const {
    data: staff = [],
    isLoading,
    error,
  } = useGetStaffQuery();

  if (isLoading) {
    return <div>Loading staff...</div>;
  }

  if (error) {
    return <div>Failed to load staff members.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Staff Management
          </h1>

          <p className="text-muted-foreground">
            Manage salon staff members.
          </p>
        </div>

        <Button onClick={() => navigate(ROUTES.ADD_STAFF)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <StaffTable staff={staff} />
    </div>
  );
}