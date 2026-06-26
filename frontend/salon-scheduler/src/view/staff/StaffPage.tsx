import { Card, CardContent } from "@/components/ui/card";

import StaffTable from "@/components/staff/StaffTable";

import { useGetStaffQuery } from "@/features/staff/staffApi";

export default function StaffPage() {
  const {
    data: staff = [],
    isLoading,
    error,
  } = useGetStaffQuery();

  if (isLoading) {
    return <div>Loading staff...</div>;
  }

  if (error) {
    return (
      <div>
        Failed to load staff members.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Staff Management
        </h1>

        <p className="text-muted-foreground">
          Manage salon staff members.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <StaffTable staff={staff} />
        </CardContent>
      </Card>
    </div>
  );
}