using Microsoft.AspNetCore.Mvc;
using tailor_management_system.Data;
using tailor_management_system.Models;

namespace tailor_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerData _data;

        public CustomersController(CustomerData data)
        {
            _data = data;
        }

        [HttpGet("Get_Customers")]
        public IActionResult GetCustomers()
        {
            return Ok(_data.GetAll());
        }

   

 

        [HttpPost]
        public IActionResult AddCustomer([FromBody] Customer customer)
        {
            if (string.IsNullOrWhiteSpace(customer.CustomerName))
                return BadRequest("customerName is required. Use: {\"customerName\":\"...\", \"phone\":\"...\", \"address\":\"...\"}");

            if (string.IsNullOrWhiteSpace(customer.Phone))
                return BadRequest("phone is required.");

            try
            {
                _data.Insert(customer);
                return Ok("Customer Added Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Database error: {ex.Message}");
            }
        }

   

        [HttpPut("UpdateCustomer")]
        public IActionResult UpdateCustomer([FromBody] Customer customer)
        {
            if (customer.CustomerID <= 0) return BadRequest("CustomerID is required.");
            if (_data.Update(customer) == 0) return NotFound();
            return Ok("Customer Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            if (_data.Delete(id) == 0) return NotFound();
            return Ok("Customer Deleted Successfully");
        }
    }
}
