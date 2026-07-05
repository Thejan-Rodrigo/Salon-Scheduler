export interface Appointment {
  id: string;

  customerName: string;

  staffName: string;

  serviceName: string;

  appointmentDate: string;

  startTime: string;

  endTime: string;

  status:
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled";

  paymentStatus:
    | "Pending"
    | "Paid";

  price: number;
}