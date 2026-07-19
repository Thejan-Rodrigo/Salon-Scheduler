using System.ComponentModel.DataAnnotations.Schema;
using SalonScheduler.API.Models;

public class Appointment
{
    public Guid Id { get; set; }

    public Guid CustomerId { get; set; }
    public User Customer { get; set; } = null!;

    public Guid StaffId { get; set; }
    public Staff Staff { get; set; } = null!;

    public Guid ServiceId { get; set; }
    public Service Service { get; set; } = null!;

    public DateTime AppointmentDate { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public Guid Notes { get; set; }

    public string Status { get; set; } = "Pending";
}