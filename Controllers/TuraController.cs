using AutoMapper;
using EfikasnostPrijevoza_C__API.Data;
using EfikasnostPrijevoza_C__API.Models;
using EfikasnostPrijevoza_C__API.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace EfikasnostPrijevoza_C__API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class TuraController(EfikasnostContext context, IMapper mapper):EfikasnostController(context, mapper)
    {


        [HttpGet]
        
        public ActionResult<List<TuraDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var lista = _context.Tura
                                   .Include(t => t.Kamioni)  
                                   .Include(t => t.Vozaci)   
                                   .ToList();
                var mappedResult = _mapper.Map<List<TuraDTORead>>(lista);
                return Ok(mappedResult);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("{tura_id:int}")]
        public ActionResult<TuraDTOInsertUpdate> GetBySifra(int tura_id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Tura? e;
            try
            {
                var ture = _context.Tura
                                   .Include(t => t.Kamioni)
                                   .Include(t => t.Vozaci)
                                   .ToList();
                e = ture.FirstOrDefault(x => x.tura_id == tura_id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Tura ne postoji u bazi" });
            }

            return Ok(_mapper.Map<TuraDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(TuraDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Kamioni? es;
            try
            {
                es = _context.Kamioni.Find(dto.Kamion_id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Kamion na turi ne postoji u bazi" });
            }

            Vozaci? ev;
            try
            {
                ev = _context.Vozaci.Find(dto.Vozac_id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (ev == null)
            {
                return NotFound(new { poruka = "Vozač na turi ne postoji u bazi" });
            }

            try
            {
                var e = _mapper.Map<Tura>(dto);
                e.Kamioni = es;
                e.Vozaci = ev;
                _context.Tura.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<TuraDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }
        [HttpPut]
        [Route("{tura_id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int tura_id, TuraDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Tura? e;
                try
                {
                    var ture = _context.Tura
                                   .Include(t => t.Kamioni)
                                   .Include(t => t.Vozaci)
                                   .ToList();
                    e = ture.FirstOrDefault(x => x.tura_id == tura_id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Grupa ne postoji u bazi" });
                }

                Kamioni? ek;
                try
                {
                    ek = _context.Kamioni.Find(dto.Kamion_id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (ek == null)
                {
                    return NotFound(new { poruka = "Kamion u turi ne postoji u bazi" });
                }

                Vozaci? ev;
                try
                {
                    ev = _context.Vozaci.Find(dto.Vozac_id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (ek == null)
                {
                    return NotFound(new { poruka = "Vozač u turi ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);
                e.Kamioni = ek;
                e.Vozaci = ev;
                _context.Tura.Update(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        [HttpDelete]
        [Route("{tura_id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int tura_id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Tura? e;
                try
                {
                    e = _context.Tura.Find(tura_id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Tura ne postoji u bazi");
                }
                _context.Tura.Remove(e);
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
