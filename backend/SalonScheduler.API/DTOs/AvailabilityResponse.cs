namespace SalonScheduler.API.DTOs;

public class AvailabilityResponse
{
    public List<string> AvailableSlots { get; set; } = new();
}