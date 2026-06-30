namespace tailor_management_system.Models
{
    public class MeasurementWithOrderDetails
    {
        public int MeasurementID { get; set; }
        public int OrderID { get; set; }
        public string OrderName { get; set; } = string.Empty;

        public decimal Chest { get; set; }
        public decimal Waist { get; set; }
        public decimal Length { get; set; }

        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public decimal TotalAmount { get; set; }

        public int CustomerID { get; set; }
        public string CustomerName { get; set; } = string.Empty;

        public int TailorID { get; set; }
        public string TailorName { get; set; } = string.Empty;
    }
}
