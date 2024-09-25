using AutoMapper;
using EfikasnostPrijevoza_C__API.Data;
using EfikasnostPrijevoza_C__API.Models;
using EfikasnostPrijevoza_C__API.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EfikasnostPrijevoza_C__API.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class KamionController(EfikasnostContext context, IMapper mapper):EfikasnostController(context, mapper)
    {

       

        [HttpGet]
        public ActionResult<List<KamionDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<KamionDTORead>>(_context.Kamioni));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("{kamion_id:int}")]
        public ActionResult<KamionDTORead> GetById(int kamion_id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Kamioni? e;
            try
            {
                e = _context.Kamioni.Find(kamion_id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Kamion ne postoji u bazi" });
            }

            return Ok(_mapper.Map<KamionDTORead>(e));
        }

        [HttpPost]
        public IActionResult Post(KamionDTOInsertUpdate kamionDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Kamioni>(kamionDTO);
                _context.Kamioni.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<KamionDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
        [HttpPut]
        [Route("{kamion_id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int kamion_id, KamionDTOInsertUpdate kamionDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Kamioni? e;
                try
                {
                    e = _context.Kamioni.Find(kamion_id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Kamion ne postoji u bazi" });
                }

                e = _mapper.Map(kamionDTO, e);

                _context.Kamioni.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        [HttpDelete]
        [Route("{kamion_id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int kamion_id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Kamioni? e;
                try
                {
                    e = _context.Kamioni.Find(kamion_id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Kamion ne postoji u bazi");
                }
                _context.Kamioni.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}
