using EfikasnostPrijevoza_C__API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EfikasnostPrijevoza_C__API.Controllers
{
    

    [ApiController]
    [Route("api/v1/[controller]")]
    public class CiklicnaController:ControllerBase
    {
        Ciklicna ciklicna = new Ciklicna();

        [HttpGet]

        public IActionResult Metoda(int a, int b)
        {
            int redak = a;
            int stupac = b;
            int redovi = redak * stupac;
            int[,] tablica = new int[redak, stupac];
            int minRedak = 0;
            int maxRedak = redak - 1;
            int minStupac = 0;
            int maxStupac = stupac - 1;
            int broj = 1;


            while (broj <= redovi)
            {

                for (int i = maxStupac; i >= minStupac; i--)
                {
                    tablica[maxRedak, i] = broj++;
                }

                if (broj > redovi)
                {
                    break;
                }
                maxRedak--;

                for (int i = maxRedak; i >= minRedak; i--)
                {
                    tablica[i, minStupac] = broj++;
                }
                if (broj > redovi)
                {
                    break;
                }
                minStupac++;
                for (int i = minStupac; i <= maxStupac; i++)
                {

                    tablica[minRedak, i] = broj++;
                }

                minRedak++;
                for (int i = minRedak; i <= maxRedak; i++)
                {
                    tablica[i, maxStupac] = broj++;
                }
                maxStupac--;
            }
            
            return Ok(JsonConvert.SerializeObject(tablica));
        }

        /*[HttpGet]

        public IActionResult Metoda2(int a, int b)
        {
            int redak = a;
            int stupac = b;
            int redovi = redak * stupac;
            int[,] tablica = new int[redak, stupac];
            int minRedak = 0;
            int maxRedak = redak - 1;
            int minStupac = 0;
            int maxStupac = stupac - 1;
            int broj = 1;
            string siva = "siva";
            string crna = "crna";
            int[,] sivaa = new int[maxRedak, maxStupac];
            List<Ciklicna> lista = new List<Ciklicna>();


            while (broj <= redovi)
            {
                Ciklicna ciklicna = new Ciklicna();
                for (int i = maxStupac; i >= minStupac; i--)
                {
                    tablica[maxRedak, i] = broj++;

                    if (tablica == sivaa) { ciklicna.Boja = "siva"; } else { ciklicna.Boja = "crna"; }

                    ciklicna.Broj = broj;

                    if (i == minStupac) { ciklicna.Gore = true; } else { ciklicna.Gore = false; }

                    ciklicna.Dolje = false;

                    if (i == minStupac) { ciklicna.Lijevo = false; } else { ciklicna.Lijevo = true; }

                    if (i == maxStupac) { ciklicna.Desno = false; } else { ciklicna.Desno = true; }
                    lista.Add(ciklicna);
                }

                if (broj > redovi)
                {
                    break;
                }
                maxRedak--;
                for (int i = maxRedak; i >= minRedak; i--)
                {
                    tablica[i, minStupac] = broj++;

                }
                if (broj > redovi)
                {
                    break;
                }
                minStupac++;
                for (int i = minStupac; i <= maxStupac; i++)
                {

                    tablica[minRedak, i] = broj++;
                }

                minRedak++;
                for (int i = minRedak; i <= maxRedak; i++)
                {
                    tablica[i, maxStupac] = broj++;
                }
                maxStupac--;
            }
            return Ok(lista);


        }*/
    }
}
