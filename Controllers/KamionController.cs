using EfikasnostPrijevoza_C__API.Data;
using EfikasnostPrijevoza_C__API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EfikasnostPrijevoza_C__API.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class KamionController:ControllerBase
    {

       private readonly EfikasnostContext _context; 
       public KamionController(EfikasnostContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Kamioni);
        }

        [HttpGet]
        [Route("{kamion_id:int}")]
        public IActionResult GetById(int kamion_id)
        {
            return Ok(_context.Kamioni.Find(kamion_id));
        }

        [HttpPost]
        public IActionResult Post(Kamioni kamion)
        {
            _context.Kamioni.Add(kamion);   
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, kamion);
        }
        [HttpPut]
        [Route("{kamion_id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int kamion_id, Kamioni kamion)
        {
            var kamionIzBaze = _context.Kamioni.Find(kamion_id);

            kamionIzBaze.reg_oznaka = kamion.reg_oznaka;
            kamionIzBaze.marka = kamion.marka;
            kamionIzBaze.godina_proizvodnje = kamion.godina_proizvodnje;
            kamionIzBaze.prosjecna_potrosnja_goriva = kamion.prosjecna_potrosnja_goriva;
            kamionIzBaze.istek_registracije = kamion.istek_registracije;

            _context.Kamioni.Update(kamionIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });

        }

        [HttpDelete]
        [Route("{kamion_id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int kamion_id)
        {
            var kamionIzBaze = _context.Kamioni.Find(kamion_id);
            _context.Kamioni.Remove(kamionIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }
    }
}
