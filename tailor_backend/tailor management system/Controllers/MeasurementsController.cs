using Microsoft.AspNetCore.Mvc;
using tailor_management_system.Data;
using tailor_management_system.Models;

namespace tailor_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementsController : ControllerBase
    {
        private readonly MeasurementData _data;
        private readonly OrderData _orderData;

        public MeasurementsController(MeasurementData data, OrderData orderData)
        {
            _data = data;
            _orderData = orderData;
        }

        [HttpGet("Get_Measurements")]
        public IActionResult GetMeasurements()
        {
            return Ok(_data.GetAllWithOrder());
        }

   


        [HttpGet("orders")]
        public IActionResult GetOrdersForMeasurements()
        {
            return Ok(_orderData.GetAll());
        }



        [HttpPost]
        public IActionResult AddMeasurement([FromBody] Measurement measurement)
        {
            _data.Insert(measurement);
            return Ok("Measurement Added Successfully");
        }



        [HttpPut("UpdateMeasuremet")]
        public IActionResult UpdateMeasurement([FromBody] Measurement measurement)
        {
            if (_data.Update(measurement) == 0)
                return NotFound();

            return Ok("Measurement Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMeasurement(int id)
        {
            if (_data.Delete(id) == 0) return NotFound();
            return Ok("Measurement Deleted Successfully");
        }
    }
}
