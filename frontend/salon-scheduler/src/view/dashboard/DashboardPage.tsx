import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimplePieChart } from "@/components/ui/SimplePieChart";

// Mock data - in a real app, this would be fetched from the API
const data = [
  { name: "Pending", value: 15, color: "#f59e0b" },
  { name: "Finished", value: 45, color: "#10b981" },
  { name: "Cancelled", value: 5, color: "#ef4444" },
];

export default function DashboardPage() {
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
      </div>
    </div>
  );
}
