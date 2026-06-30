using Microsoft.Data.SqlClient;
using System.Data;
using tailor_management_system.Models;

namespace tailor_management_system.Data
{
    public class OrderData
    {
        private readonly string _connectionString;

        public OrderData(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }

        public List<Order> GetAll()
        {
            var orders = new List<Order>();

            using var con = new SqlConnection(_connectionString);
            using var da = new SqlDataAdapter(
                "SELECT OrderID, OrderName, CustomerID, TailorID, OrderDate, DeliveryDate, TotalAmount FROM Orders", con);
            var dt = new DataTable();
            da.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                orders.Add(new Order
                {
                    OrderID = Convert.ToInt32(row["OrderID"]),
                    OrderName = row["OrderName"].ToString() ?? "",
                    CustomerID = Convert.ToInt32(row["CustomerID"]),
                    TailorID = Convert.ToInt32(row["TailorID"]),
                    OrderDate = Convert.ToDateTime(row["OrderDate"]),
                    DeliveryDate = Convert.ToDateTime(row["DeliveryDate"]),
                    TotalAmount = Convert.ToDecimal(row["TotalAmount"])
                });
            }

            return orders;
        }

        public List<OrderWithDetails> GetAllWithCustomerAndTailor()
        {
            var orders = new List<OrderWithDetails>();

            using var con = new SqlConnection(_connectionString);
            using var da = new SqlDataAdapter(
                @"SELECT
                    o.OrderID,
                    o.OrderName,
                    o.CustomerID,
                    c.CustomerName,
                    c.Phone AS CustomerPhone,
                    o.TailorID,
                    t.TailorName,
                    t.Phone AS TailorPhone,
                    o.OrderDate,
                    o.DeliveryDate,
                    o.TotalAmount
                  FROM Orders o
                  INNER JOIN Customers c ON c.CustomerID = o.CustomerID
                  INNER JOIN Tailors t ON t.TailorID = o.TailorID",
                con);

            var dt = new DataTable();
            da.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                orders.Add(new OrderWithDetails
                {
                    OrderID = Convert.ToInt32(row["OrderID"]),
                    OrderName = row["OrderName"].ToString() ?? "",
                    CustomerID = Convert.ToInt32(row["CustomerID"]),
                    CustomerName = row["CustomerName"].ToString() ?? "",
                    CustomerPhone = row["CustomerPhone"].ToString() ?? "",
                    TailorID = Convert.ToInt32(row["TailorID"]),
                    TailorName = row["TailorName"].ToString() ?? "",
                    TailorPhone = row["TailorPhone"].ToString() ?? "",
                    OrderDate = Convert.ToDateTime(row["OrderDate"]),
                    DeliveryDate = Convert.ToDateTime(row["DeliveryDate"]),
                    TotalAmount = Convert.ToDecimal(row["TotalAmount"])
                });
            }

            return orders;
        }



        public void Insert(Order order)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(
                @"INSERT INTO Orders (OrderName, CustomerID, TailorID, OrderDate, DeliveryDate, TotalAmount)
                  VALUES (@OrderName, @CustomerID, @TailorID, @OrderDate, @DeliveryDate, @TotalAmount)", con);

            cmd.Parameters.AddWithValue("@OrderName", order.OrderName);
            cmd.Parameters.AddWithValue("@CustomerID", order.CustomerID);
            cmd.Parameters.AddWithValue("@TailorID", order.TailorID);
            cmd.Parameters.AddWithValue("@OrderDate", order.OrderDate);
            cmd.Parameters.AddWithValue("@DeliveryDate", order.DeliveryDate);
            cmd.Parameters.AddWithValue("@TotalAmount", order.TotalAmount);

            con.Open();
            cmd.ExecuteNonQuery();
        }

        public int Update(Order order)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(
                @"UPDATE Orders
                  SET OrderName = @OrderName,
                      CustomerID = @CustomerID,
                      TailorID = @TailorID,
                      OrderDate = @OrderDate,
                      DeliveryDate = @DeliveryDate,
                      TotalAmount = @TotalAmount
                  WHERE OrderID = @OrderID", con);

            cmd.Parameters.AddWithValue("@OrderID", order.OrderID);
            cmd.Parameters.AddWithValue("@OrderName", order.OrderName);
            cmd.Parameters.AddWithValue("@CustomerID", order.CustomerID);
            cmd.Parameters.AddWithValue("@TailorID", order.TailorID);
            cmd.Parameters.AddWithValue("@OrderDate", order.OrderDate);
            cmd.Parameters.AddWithValue("@DeliveryDate", order.DeliveryDate);
            cmd.Parameters.AddWithValue("@TotalAmount", order.TotalAmount);

            con.Open();
            return cmd.ExecuteNonQuery();
        }

        public int Delete(int id)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("DELETE FROM Orders WHERE OrderID = @Id", con);
            cmd.Parameters.AddWithValue("@Id", id);
            con.Open();
            return cmd.ExecuteNonQuery();
        }
    }
}
