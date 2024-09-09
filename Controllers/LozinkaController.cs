using EfikasnostPrijevoza_C__API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Newtonsoft.Json;
using System;
using Microsoft.AspNetCore.Http.HttpResults;

namespace EfikasnostPrijevoza_C__API.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class LozinkaController : ControllerBase
    {
        public Lozinka lozinke { get; set; }


        [HttpGet]
        public IActionResult Metoda(int Koliko_znamenaka_ima_lozinka, string Ukljucena_velika_slova,
            string Ukljucena_mala_slova, string Ukljuceni_brojevi, string Ukljuceni_interpukcijski_znakovi,
            int Broj_lozinki)
        {

            int duzina = Koliko_znamenaka_ima_lozinka;
            bool velikaSlova = UcitajBool(Ukljucena_velika_slova);
            bool malaSlova = UcitajBool(Ukljucena_mala_slova);
            bool brojevi = UcitajBool(Ukljuceni_brojevi);
            bool interZnakovi = UcitajBool(Ukljuceni_interpukcijski_znakovi);
            int kolicina = Broj_lozinki;
            List<Lozinka> Lista = new List<Lozinka>();
            Lozinka lozinka1 = new Lozinka();

            if (Koliko_znamenaka_ima_lozinka < 2)
            {
                return BadRequest("Lozinka mora sadržavati bar 2 znamenke");
            }

            if (Broj_lozinki < 1)
            {
                return BadRequest("Mora biti barem 1 lozinka");
            }


            char[] SLOVA = "QWERTZUIOPŠĐASDFGHJKLČĆŽYXCVBNM".ToCharArray();
            char[] slova = "qwertzuiopšđasdfghjklčćžyxcvbnm".ToCharArray();
            char[] intiger = "1234567890".ToCharArray();
            char[] znakovi = "!#$%&/()=?*@ß¤+-|".ToCharArray();

            List<char> lozinka = new List<char>();

            if (velikaSlova == true)
            {
                foreach (var item in SLOVA)
                {
                    lozinka.Add(item);
                }
            }
            if (malaSlova == true)
            {
                foreach (var item in slova)
                {
                    lozinka.Add(item);
                }
            }
            if (brojevi == true)
            {
                foreach (var item in intiger)
                {
                    lozinka.Add(item);
                }
            }
            if (interZnakovi == true)
            {
                foreach (var item in znakovi)
                {
                    lozinka.Add(item);
                }
            }

            char[] LozinkaFinal = new char[duzina];
            int rb = 0;

            for (int i = 0; i < kolicina; i++)
            {
                StringBuilder sb = new StringBuilder();
                for (int j = 0; j < duzina; j++)
                {
                    char dio = lozinka[Random.Shared.Next(lozinka.Count - 1)];
                    sb.Append(dio);
                }


                Lista.Add(new Lozinka { lozinka = sb.ToString() });
                sb.Clear();



            }
            return Ok(JsonConvert.SerializeObject(Lista));

        }
        private static bool UcitajBool(string Unos)
        {
            Unos =Unos.Trim().ToLower();
            return Unos == "da";

        }
    
    }
}

        
    




        