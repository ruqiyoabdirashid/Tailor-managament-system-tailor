namespace tailor_management_system.Models
{
    public class Payment
    {
        public int PaymentID { get; set; }
        public int OrderID { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal AmountPaid { get; set; }
    }
}
