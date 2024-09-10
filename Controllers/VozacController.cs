using EfikasnostPrijevoza_C__API.Data;
using EfikasnostPrijevoza_C__API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Bogus.DataSets;


namespace EfikasnostPrijevoza_C__API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VozacController:ControllerBase
    {
        private readonly EfikasnostContext _context;
        public VozacController(EfikasnostContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Vozaci);
        }

        [HttpGet]
        [Route("{vozac_id:int}")]
        public IActionResult GetById(int vozac_id)
        {
            return Ok(_context.Vozaci.Find(vozac_id));
        }

        [HttpPost]
        public IActionResult Post(Vozaci vozac)
        {
            _context.Vozaci.Add(vozac);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, vozac);
        }
        [HttpPut]
        [Route("{vozac_id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int vozac_id, Vozaci vozac)
        {
            var vozacIzBaze = _context.Vozaci.Find(vozac_id);

            vozacIzBaze.ime = vozac.ime;
            vozacIzBaze.prezime = vozac.prezime;
            vozacIzBaze.datum_rodenja = vozac.datum_rodenja;
            vozacIzBaze.istek_ugovora = vozac.istek_ugovora;

            _context.Vozaci.Update(vozacIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }

        [HttpDelete]
        [Route("{vozac_id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int vozac_id)
        {
            var vozacIzBaze = _context.Vozaci.Find(vozac_id);
            _context.Vozaci.Remove(vozacIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }
    }
}
