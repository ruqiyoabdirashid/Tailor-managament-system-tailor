using Microsoft.Data.SqlClient;
using System.Data;
using tailor_management_system.Models;

namespace tailor_management_system.Data
{
    public class TailorData
    {
        private readonly string _connectionString;

        public TailorData(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }

        public List<Tailor> GetAll()
        {
            var tailors = new List<Tailor>();

            using var con = new SqlConnection(_connectionString);
            using var da = new SqlDataAdapter("SELECT TailorID, TailorName, Phone, Specialty FROM Tailors", con);
            var dt = new DataTable();
            da.Fill(dt);

            foreach (DataRow row in dt.Rows)
            {
                tailors.Add(new Tailor
                {
                    TailorID = Convert.ToInt32(row["TailorID"]),
                    TailorName = row["TailorName"].ToString() ?? "",
                    Phone = row["Phone"].ToString() ?? "",
                    Specialty = row["Specialty"].ToString() ?? ""
                });
            }

            return tailors;
        }



        public void Insert(Tailor tailor)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(
                @"INSERT INTO Tailors (TailorName, Phone, Specialty)
                  VALUES (@TailorName, @Phone, @Specialty)", con);

            cmd.Parameters.AddWithValue("@TailorName", tailor.TailorName);
            cmd.Parameters.AddWithValue("@Phone", tailor.Phone);
            cmd.Parameters.AddWithValue("@Specialty", tailor.Specialty);

            con.Open();
            cmd.ExecuteNonQuery();
        }

        public int Update(Tailor tailor)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(
                @"UPDATE Tailors
                  SET TailorName = @TailorName, Phone = @Phone, Specialty = @Specialty
                  WHERE TailorID = @TailorID", con);

            cmd.Parameters.AddWithValue("@TailorID", tailor.TailorID);
            cmd.Parameters.AddWithValue("@TailorName", tailor.TailorName);
            cmd.Parameters.AddWithValue("@Phone", tailor.Phone);
            cmd.Parameters.AddWithValue("@Specialty", tailor.Specialty);

            con.Open();
            return cmd.ExecuteNonQuery();
        }

        public int Delete(int id)
        {
            using var con = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("DELETE FROM Tailors WHERE TailorID = @Id", con);
            cmd.Parameters.AddWithValue("@Id", id);
            con.Open();
            return cmd.ExecuteNonQuery();
        }
    }
}
