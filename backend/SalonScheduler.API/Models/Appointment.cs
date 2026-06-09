namespace SalonScheduler.API.Models;

public class Appointment
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; } // customer

    public Guid ServiceId { get; set; }

    public DateTime AppointmentDate { get; set; }

    public string Status { get; set; } = "Pending"; 
}