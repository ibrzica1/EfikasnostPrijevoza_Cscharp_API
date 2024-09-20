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

        [HttpGet("Metoda1")]

        public IActionResult Metoda1(int a, int b)
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

        [HttpGet("Metoda2")]

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
            int broj = 0;
            List<Ciklicna> lista = new List<Ciklicna>();


            while (broj <= redovi)
            {

                for (int i = maxStupac; i >= minStupac; i--)
                {
                    tablica[maxRedak, i] = broj++;

                    var ciklicna = new Ciklicna();
                    {
                        if (broj == 1) { ciklicna.Boja = "siva"; } else { ciklicna.Boja = "crna"; }
                        ciklicna.Broj = broj;
                        if (i == minStupac) { ciklicna.Gore = true; } else { ciklicna.Gore = false; }
                        ciklicna.Dolje = false;
                        if (i == minStupac || ciklicna.Boja == "siva") { ciklicna.Lijevo = false; } else { ciklicna.Lijevo = true; }
                        if (i == maxStupac) { ciklicna.Desno = false; } else { ciklicna.Desno = true; }
                    }
                    lista.Add(ciklicna);
                }

                if (broj >= redovi)
                {
                    break;
                }
                maxRedak--;


                for (int i = maxRedak; i >= minRedak; i--)
                {
                    tablica[i, minStupac] = broj++;

                    var ciklicna = new Ciklicna();
                    {
                        ciklicna.Boja = "crna";
                        ciklicna.Broj = broj;
                        if (i == minRedak) { ciklicna.Gore = false; } else { ciklicna.Gore = true; }
                        ciklicna.Dolje = true;
                        ciklicna.Lijevo = false;
                        if (i == minRedak) { ciklicna.Desno = true; } else { ciklicna.Desno = false; }
                    }
                    lista.Add(ciklicna);
                }
                if (broj >= redovi)
                {
                    break;
                }
                minStupac++;
                for (int i = minStupac; i <= maxStupac; i++)
                {
                    tablica[minRedak, i] = broj++;

                    var ciklicna = new Ciklicna();
                    {
                        ciklicna.Boja = "crna";
                        ciklicna.Broj = broj;
                        ciklicna.Gore = false;
                        if (i == maxStupac) { ciklicna.Dolje = true; } else { ciklicna.Dolje = false; }
                        ciklicna.Lijevo = true;
                        if (i == maxStupac) { ciklicna.Desno = false; } else { ciklicna.Desno = true; };
                    }
                    lista.Add(ciklicna);
                }

                minRedak++;
                for (int i = minRedak; i <= maxRedak; i++)
                {
                    tablica[i, maxStupac] = broj++;

                    var ciklicna = new Ciklicna();
                    {
                        ciklicna.Boja = "crna";
                        ciklicna.Broj = broj;
                        ciklicna.Gore = true;
                        if (i == maxRedak) { ciklicna.Dolje = false; } else { ciklicna.Dolje = true; }
                        ciklicna.Desno = false;
                        if (i == maxRedak) { ciklicna.Lijevo = true; } else { ciklicna.Lijevo = false; }
                    }
                    lista.Add(ciklicna);
                }
                maxStupac--;
            }
            Ciklicna[] niz = new Ciklicna[redovi];

            foreach (var item in lista)
            {
                niz.Append(item);
            }


            return Ok(JsonConvert.SerializeObject(lista));

        }
    }
}
