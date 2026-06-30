using Microsoft.Data.SqlClient;
using System.Data;
using tailor_management_system.Models;

namespace tailor_management_system.Data
{
    public class CustomerData
    {
        private readonly string _connectionString;

        public CustomerData(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }

        public List<Customer> GetAll()
        {
            var customers = new List<Customer>();

            using var con = new SqlConnection(_connectionString);
            using var da = new SqlDataAdapter("SELECT CustomerID, CustomerName, Phone, Address FROM Customers", con);
            var dt = new DataTable();
            da.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                customers.Add(new Customer
                {
                    CustomerID = Convert.ToInt32(row["CustomerID"]),
                    CustomerName = row["CustomerName"].ToString() ?? "",
                    Phone = row["Phone"].ToString() ?? "",
                    Address = row["Address"].ToString() ?? ""
                });
            }

            return customers;
        }


        public void Insert(Customer customer)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(
                @"INSERT INTO Customers (CustomerName, Phone, Address)
                  VALUES (@CustomerName, @Phone, @Address)", con);

            cmd.Parameters.AddWithValue("@CustomerName", customer.CustomerName);
            cmd.Parameters.AddWithValue("@Phone", customer.Phone);
            cmd.Parameters.AddWithValue("@Address", customer.Address);

            con.Open();
            cmd.ExecuteNonQuery();
        }

        public int Update(Customer customer)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(
                @"UPDATE Customers
                  SET CustomerName = @CustomerName, Phone = @Phone, Address = @Address
                  WHERE CustomerID = @CustomerID", con);

            cmd.Parameters.AddWithValue("@CustomerID", customer.CustomerID);
            cmd.Parameters.AddWithValue("@CustomerName", customer.CustomerName);
            cmd.Parameters.AddWithValue("@Phone", customer.Phone);
            cmd.Parameters.AddWithValue("@Address", customer.Address);

            con.Open();
            return cmd.ExecuteNonQuery();
        }

        public int Delete(int id)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("DELETE FROM Customers WHERE CustomerID = @Id", con);
            cmd.Parameters.AddWithValue("@Id", id);
            con.Open();
            return cmd.ExecuteNonQuery();
        }
    }
}
