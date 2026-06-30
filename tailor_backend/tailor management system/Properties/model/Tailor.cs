namespace tailor_management_system.Models
{
    public class Tailor
    {
        public int TailorID { get; set; }
        public string TailorName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
    }
}
