import CustomerForm from "@/components/customer/CustomerForm";

export default function AddCustomerPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Add Customer</h1>
                <p className="text-muted-foreground">
                    Create a new salon customer.
                </p>
            </div>

            <CustomerForm />
        </div>
    );
}
