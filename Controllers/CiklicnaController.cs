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
    }
}
