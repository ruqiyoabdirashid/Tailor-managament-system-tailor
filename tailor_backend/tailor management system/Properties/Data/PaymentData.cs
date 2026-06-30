//using Microsoft.Data.SqlClient;
//using System.Data;
//using tailor_management_system.Models;

//namespace tailor_management_system.Data
//{
//    public class PaymentData
//    {
//        private readonly string _connectionString;

//        public PaymentData(IConfiguration configuration)
//        {
//            _connectionString = configuration.GetConnectionString("DefaultConnection")
//                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
//        }

//        public List<Payment> GetAll()
//        {
//            var list = new List<Payment>();

//            using var con = new SqlConnection(_connectionString);
//            using var da = new SqlDataAdapter(
//                "SELECT PaymentID, OrderID, PaymentDate, AmountPaid FROM Payments", con);
//            var dt = new DataTable();
//            da.Fill(dt);

//            foreach (DataRow row in dt.Rows)
//            {
//                list.Add(new Payment
//                {
//                    PaymentID = Convert.ToInt32(row["PaymentID"]),
//                    OrderID = Convert.ToInt32(row["OrderID"]),
//                    PaymentDate = Convert.ToDateTime(row["PaymentDate"]),
//                    AmountPaid = Convert.ToDecimal(row["AmountPaid"])
//                });
//            }

//            return list;
//        }

//        public Payment? GetById(int id)
//        {
//            using var con = new SqlConnection(_connectionString);
//            using var cmd = new SqlCommand(
//                "SELECT PaymentID, OrderID, PaymentDate, AmountPaid FROM Payments WHERE PaymentID = @Id", con);
//            cmd.Parameters.AddWithValue("@Id", id);
//            con.Open();

//            using var reader = cmd.ExecuteReader();
//            if (!reader.Read()) return null;

//            return new Payment
//            {
//                PaymentID = reader.GetInt32(0),
//                OrderID = reader.GetInt32(1),
//                PaymentDate = reader.GetDateTime(2),
//                AmountPaid = reader.GetDecimal(3)
//            };
//        }

//        public void Insert(Payment payment)
//        {
//            using var con = new SqlConnection(_connectionString);
//            using var cmd = new SqlCommand(
//                @"INSERT INTO Payments (OrderID, PaymentDate, AmountPaid)
//                  VALUES (@OrderID, @PaymentDate, @AmountPaid)", con);

//            cmd.Parameters.AddWithValue("@OrderID", payment.OrderID);
//            cmd.Parameters.AddWithValue("@PaymentDate", payment.PaymentDate);
//            cmd.Parameters.AddWithValue("@AmountPaid", payment.AmountPaid);

//            con.Open();
//            cmd.ExecuteNonQuery();
//        }

//        public int Update(Payment payment)
//        {
//            using var con = new SqlConnection(_connectionString);
//            using var cmd = new SqlCommand(
//                @"UPDATE Payments
//                  SET OrderID = @OrderID, PaymentDate = @PaymentDate, AmountPaid = @AmountPaid
//                  WHERE PaymentID = @PaymentID", con);

//            cmd.Parameters.AddWithValue("@PaymentID", payment.PaymentID);
//            cmd.Parameters.AddWithValue("@OrderID", payment.OrderID);
//            cmd.Parameters.AddWithValue("@PaymentDate", payment.PaymentDate);
//            cmd.Parameters.AddWithValue("@AmountPaid", payment.AmountPaid);

//            con.Open();
//            return cmd.ExecuteNonQuery();
//        }

//        public int Delete(int id)
//        {
//            using var con = new SqlConnection(_connectionString);
//            using var cmd = new SqlCommand("DELETE FROM Payments WHERE PaymentID = @Id", con);
//            cmd.Parameters.AddWithValue("@Id", id);
//            con.Open();
//            return cmd.ExecuteNonQuery();
//        }
//    }
//}
