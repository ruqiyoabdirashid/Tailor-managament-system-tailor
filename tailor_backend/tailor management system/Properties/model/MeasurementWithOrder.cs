namespace tailor_management_system.Models
{
    public class MeasurementWithOrder
    {
        public int MeasurementID { get; set; }
        public int OrderID { get; set; }
        public string OrderName { get; set; } = string.Empty;

        public decimal Chest { get; set; }
        public decimal Waist { get; set; }
        public decimal Length { get; set; }
    }
}
