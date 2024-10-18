using EfikasnostPrijevoza_C__API.Data;
using EfikasnostPrijevoza_C__API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Bogus.DataSets;
using AutoMapper;
using EfikasnostPrijevoza_C__API.Models.DTO;
using Microsoft.EntityFrameworkCore;


namespace EfikasnostPrijevoza_C__API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VozacController(EfikasnostContext context, IMapper mapper):EfikasnostController(context, mapper)
    {
       

        [HttpGet]
        public ActionResult<List<VozacDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<VozacDTORead>>(_context.Vozaci));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("{vozac_id:int}")]
        public ActionResult<KamionDTORead> GetById(int vozac_id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Vozaci? e;
            try
            {
                e = _context.Vozaci.Find(vozac_id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Vozač ne postoji u bazi" });
            }

            return Ok(_mapper.Map<VozacDTORead>(e));
        }

        [HttpPost]
        public IActionResult Post(VozacDTOInsertUpdate vozacDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Vozaci>(vozacDTO);
                _context.Vozaci.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<VozacDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
        [HttpPut]
        [Route("{vozac_id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int vozac_id, VozacDTOInsertUpdate vozacDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Vozaci? e;
                try
                {
                    e = _context.Vozaci.Find(vozac_id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Vozač ne postoji u bazi" });
                }

                e = _mapper.Map(vozacDTO, e);

                _context.Vozaci.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        [HttpDelete]
        [Route("{vozac_id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int vozac_id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Vozaci? e;
                try
                {
                    e = _context.Vozaci.Find(vozac_id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Vozač ne postoji u bazi");
                }
                _context.Vozaci.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("traziStranicenje/{stranica}")]
        public IActionResult TraziVozacStranicenje(int stranica, string uvjet = "")
        {
            var poStranici = 4;
            uvjet = uvjet.ToLower();
            try
            {
                var vozaci = _context.Vozaci
                    .Where(p => EF.Functions.Like(p.ime.ToLower(), "%" + uvjet + "%")
                                || EF.Functions.Like(p.prezime.ToLower(), "%" + uvjet + "%"))
                    .Skip((poStranici * stranica) - poStranici)
                    .Take(poStranici)
                    .OrderBy(p => p.prezime)
                    .ToList();


                return Ok(_mapper.Map<List<VozacDTORead>>(vozaci));

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("postaviSliku/{vozac_id:int}")]
        public IActionResult PostaviSliku(int vozac_id, SlikaDTO slika)
        {
            if (vozac_id <= 0)
            {
                return BadRequest("Šifra mora biti veća od nula (0)");
            }
            if (slika.Base64 == null || slika.Base64?.Length == 0)
            {
                return BadRequest("Slika nije postavljena");
            }
            var p = _context.Vozaci.Find(vozac_id);
            if (p == null)
            {
                return BadRequest("Ne postoji vozač s šifrom " + vozac_id + ".");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "vozaci");

                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + vozac_id + ".png");
                System.IO.File.WriteAllBytes(putanja, Convert.FromBase64String(slika.Base64!));
                return Ok("Uspješno pohranjena slika");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
