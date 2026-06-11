public class Appointment
{
    public Guid Id { get; set; }

    public Guid CustomerId { get; set; }

    public Guid StaffId { get; set; }

    public Guid ServiceId { get; set; }

    public DateTime AppointmentDate { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public string Status { get; set; } = "Pending";
}