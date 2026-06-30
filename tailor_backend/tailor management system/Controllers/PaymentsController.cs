//using Microsoft.AspNetCore.Mvc;
//using tailor_management_system.Data;
//using tailor_management_system.Models;

//namespace tailor_management_system.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class PaymentsController : ControllerBase
//    {
//        private readonly PaymentData _data;

//        public PaymentsController(PaymentData data)
//        {
//            _data = data;
//        }

//        [HttpGet]
//        public IActionResult GetPayments()
//        {
//            return Ok(_data.GetAll());
//        }

//        [HttpGet("{id}")]
//        public IActionResult GetPayment(int id)
//        {
//            var payment = _data.GetById(id);
//            if (payment == null) return NotFound();
//            return Ok(payment);
//        }

//        [HttpPost]
//        public IActionResult AddPayment([FromBody] Payment payment)
//        {
//            _data.Insert(payment);
//            return Ok("Payment Added Successfully");
//        }

//        [HttpPut("{id}")]
//        public IActionResult UpdatePayment(int id, [FromBody] Payment payment)
//        {
//            payment.PaymentID = id;
//            if (_data.Update(payment) == 0) return NotFound();
//            return Ok("Payment Updated Successfully");
//        }

//        [HttpDelete("{id}")]
//        public IActionResult DeletePayment(int id)
//        {
//            if (_data.Delete(id) == 0) return NotFound();
//            return Ok("Payment Deleted Successfully");
//        }
//    }
//}
