import ServiceForm from "@/components/service/ServiceForm";

export default function AddServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add Service
        </h1>

        <p className="text-muted-foreground">
          Create a new salon service.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}