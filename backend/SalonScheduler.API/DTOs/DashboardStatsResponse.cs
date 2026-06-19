namespace SalonScheduler.API.DTOs;

public class DashboardStatsResponse
{
    public int TotalAppointments { get; set; }

    public int TodayAppointments { get; set; }

    public int CompletedAppointments { get; set; }

    public int CancelledAppointments { get; set; }

    public decimal TotalRevenue { get; set; }
}