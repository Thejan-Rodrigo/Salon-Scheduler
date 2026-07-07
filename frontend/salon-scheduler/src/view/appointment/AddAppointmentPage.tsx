import AppointmentForm from "@/components/appointment/AppointmentForm";

export default function AddAppointmentPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Add Appointment
        </h1>

        <p className="text-muted-foreground">
          Create a new customer appointment.
        </p>
      </div>

      <AppointmentForm />

    </div>
  );
}