using Microsoft.Data.SqlClient;
using System.Data;
using tailor_management_system.Models;

namespace tailor_management_system.Data
{
    public class MeasurementData
    {
        private readonly string _connectionString;

        public MeasurementData(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }

        public List<Measurement> GetAll()
        {
            var list = new List<Measurement>();

            using var con = new SqlConnection(_connectionString);
            using var da = new SqlDataAdapter(
                "SELECT MeasurementID, OrderID, Chest, Waist, Length FROM Measurements", con);
            var dt = new DataTable();
            da.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                list.Add(new Measurement
                {
                    MeasurementID = Convert.ToInt32(row["MeasurementID"]),
                    OrderID = Convert.ToInt32(row["OrderID"]),
                    Chest = row["Chest"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Chest"]),
                    Waist = row["Waist"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Waist"]),
                    Length = row["Length"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Length"])
                });
            }

            return list;
        }


        public List<MeasurementWithOrder> GetAllWithOrder()
        {
            var list = new List<MeasurementWithOrder>();

            using var con = new SqlConnection(_connectionString);
            using var da = new SqlDataAdapter(
                @"SELECT
                    m.MeasurementID,
                    m.OrderID,
                    o.OrderName,
                    m.Chest,
                    m.Waist,
                    m.Length
                  FROM Measurements m
                  INNER JOIN Orders o ON o.OrderID = m.OrderID",
                con);

            var dt = new DataTable();
            da.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                list.Add(new MeasurementWithOrder
                {
                    MeasurementID = Convert.ToInt32(row["MeasurementID"]),
                    OrderID = Convert.ToInt32(row["OrderID"]),
                    OrderName = row["OrderName"].ToString() ?? "",
                    Chest = row["Chest"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Chest"]),
                    Waist = row["Waist"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Waist"]),
                    Length = row["Length"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Length"])
                });
            }

            return list;
        }



        public void Insert(Measurement measurement)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(
                @"INSERT INTO Measurements (OrderID, Chest, Waist, Length)
                  VALUES (@OrderID, @Chest, @Waist, @Length)", con);

            cmd.Parameters.AddWithValue("@OrderID", measurement.OrderID);
            cmd.Parameters.AddWithValue("@Chest", measurement.Chest);
            cmd.Parameters.AddWithValue("@Waist", measurement.Waist);
            cmd.Parameters.AddWithValue("@Length", measurement.Length);

            con.Open();
            cmd.ExecuteNonQuery();
        }

        public int Update(Measurement measurement)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(
                @"UPDATE Measurements
          SET OrderID = @OrderID,
              Chest = @Chest,
              Waist = @Waist,
              Length = @Length
          WHERE MeasurementID = @MeasurementID", con);

            cmd.Parameters.AddWithValue("@MeasurementID", measurement.MeasurementID);
            cmd.Parameters.AddWithValue("@OrderID", measurement.OrderID);
            cmd.Parameters.AddWithValue("@Chest", measurement.Chest);
            cmd.Parameters.AddWithValue("@Waist", measurement.Waist);
            cmd.Parameters.AddWithValue("@Length", measurement.Length);

            con.Open();
            return cmd.ExecuteNonQuery();
        }

        public int Delete(int id)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("DELETE FROM Measurements WHERE MeasurementID = @Id", con);
            cmd.Parameters.AddWithValue("@Id", id);
            con.Open();
            return cmd.ExecuteNonQuery();
        }
    }
}
