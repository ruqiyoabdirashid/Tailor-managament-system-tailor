namespace tailor_management_system.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public string OrderName { get; set; } = string.Empty;
        public int CustomerID { get; set; }
        public int TailorID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
