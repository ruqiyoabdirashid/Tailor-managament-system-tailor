using Microsoft.AspNetCore.Mvc;
using tailor_management_system.Data;
using tailor_management_system.Models;

namespace tailor_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TailorsController : ControllerBase
    {
        private readonly TailorData _data;

        public TailorsController(TailorData data)
        {
            _data = data;
        }

        [HttpGet("Get_Tailor")]
        public IActionResult GetTailors()
        {
            return Ok(_data.GetAll());
        }

        //[HttpGet("{id}")]
        //public IActionResult GetTailor(int id)
        //{
        //    var tailor = _data.GetById(id);
        //    if (tailor == null) return NotFound();
        //    return Ok(tailor);
        //}

        [HttpPost]
        public IActionResult AddTailor([FromBody] Tailor tailor)
        {
            if (string.IsNullOrWhiteSpace(tailor.TailorName))
                return BadRequest("tailorName is required. Use: {\"tailorName\":\"...\", \"phone\":\"...\", \"specialty\":\"...\"}");

            try
            {
                _data.Insert(tailor);
                return Ok("Tailor Added Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Database error: {ex.Message}");                                                
            }
        }

     
        [HttpPut("UpdateTailor")]
        public IActionResult UpdateTailor([FromBody] Tailor tailor)
        {

            if (_data.Update(tailor) == 0) return NotFound();
            return Ok("Tailor Updated Successfully");
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteTailor(int id)
        {
            if (_data.Delete(id) == 0) return NotFound();
            return Ok("Tailor Deleted Successfully");
        }
    }
}
