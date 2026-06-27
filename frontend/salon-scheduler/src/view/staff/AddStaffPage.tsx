import StaffForm from "@/components/staff/StaffForm";

export default function AddStaffPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Add Staff Member
        </h1>

        <p className="text-muted-foreground">
          Create a new staff account.
        </p>
      </div>

      <StaffForm />
    </div>
  );
}