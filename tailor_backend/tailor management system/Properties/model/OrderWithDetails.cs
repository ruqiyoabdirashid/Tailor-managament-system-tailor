namespace tailor_management_system.Models
{
    public class OrderWithDetails
    {
        public int OrderID { get; set; }
        public string OrderName { get; set; } = string.Empty;

        public int CustomerID { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;

        public int TailorID { get; set; }
        public string TailorName { get; set; } = string.Empty;
        public string TailorPhone { get; set; } = string.Empty;

        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
