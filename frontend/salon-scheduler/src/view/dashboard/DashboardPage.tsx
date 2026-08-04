import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimplePieChart } from "@/components/ui/SimplePieChart";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useGetStaffQuery } from "@/features/staff/staffApi";

// Mock data - in a real app, this would be fetched from the API
const data = [
  { name: "Pending", value: 15, color: "#f59e0b" },
  { name: "Finished", value: 45, color: "#10b981" },
  { name: "Cancelled", value: 5, color: "#ef4444" },
];

export default function DashboardPage() {
  const { data: staff = [], isLoading } = useGetStaffQuery();

  const activeStaff = staff.filter((s) => s.isActive);
  const activeStaffPercentage = staff.length > 0 ? (activeStaff.length / staff.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of salon performance.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Status</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[300px]">
            <SimplePieChart data={data} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Availability</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center h-[300px] gap-4">
            {isLoading ? (
              <p>Loading staff...</p>
            ) : (
              <ProgressBar
                value={activeStaffPercentage}
                label={`${activeStaff.length} / ${staff.length} staff members active`}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
