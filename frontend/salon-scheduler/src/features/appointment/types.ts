export interface Appointment {
    id: string;

    customerId: string;

    staffId: string;

    serviceId: string;

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

export interface CreateAppointmentRequest {
    customerId: string;

    staffId: string;

    serviceId: string;

    appointmentDate: string;

    startTime: string;

    endTime: string;

    notes?: string;
}

export interface UpdateAppointmentRequest {
  customerId: string;
  staffId: string;
  serviceId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
}