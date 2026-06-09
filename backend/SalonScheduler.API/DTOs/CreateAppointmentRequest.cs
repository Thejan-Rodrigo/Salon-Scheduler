namespace SalonScheduler.API.DTOs;

public class CreateAppointmentRequest
{
    public Guid ServiceId { get; set; }
    public DateTime AppointmentDate { get; set; }
}