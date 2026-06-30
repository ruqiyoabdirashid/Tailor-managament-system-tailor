using Microsoft.AspNetCore.Mvc;
using tailor_management_system.Data;
using tailor_management_system.Models;

namespace tailor_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderData _data;
        private readonly CustomerData _customerData;
        private readonly TailorData _tailorData;

        public OrdersController(OrderData data, CustomerData customerData, TailorData tailorData)
        {
            _data = data;
            _customerData = customerData;
            _tailorData = tailorData;
        }

        [HttpGet("Get_Orders")]
        public IActionResult GetOrders()
        {
            return Ok(_data.GetAllWithCustomerAndTailor());
        }


        [HttpGet("customers")]
        public IActionResult GetCustomersForOrders()
        {
            return Ok(_customerData.GetAll());
        }


        [HttpGet("tailors")]
        public IActionResult GetTailorsForOrders()
        {
            return Ok(_tailorData.GetAll());
        }


        [HttpPost]
        public IActionResult AddOrder([FromBody] Order order)
        {
            _data.Insert(order);
            return Ok("Order Added Successfully");
        }

        [HttpPut("update")]
       
        public IActionResult UpdateOrder([FromBody] Order order)
        {
            if (_data.Update(order) == 0)
                return NotFound();

            return Ok("Order Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            if (_data.Delete(id) == 0) return NotFound();
            return Ok("Order Deleted Successfully");
        }
    }
}
