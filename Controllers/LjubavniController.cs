using EfikasnostPrijevoza_C__API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace EfikasnostPrijevoza_C__API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class LjubavniController:ControllerBase
    {
        public Ljubavna Ljubavni { get; set; }
        Ljubavna Ljubavna = new Ljubavna();

        [HttpGet]
        public IActionResult Metoda(string Musko_Ime, string Zensko_Ime)
        {

            string Musko = Musko_Ime;
            string Zensko = Zensko_Ime;
           

            string Zajednicko = Musko + Zensko;
            char[] ZajednickoIme = Zajednicko.ToCharArray();
            int nMusko = 0;
            int nZensko = 0;

            for (int i = 0; i < Musko.Length; i++)
            {
                nMusko++;
            }

            for (int i = 0; i < Zensko.Length; i++)
            {
                nZensko++;
            }

            int nZajednicko = nMusko + nZensko;
            List<int> broj = new List<int>();

            for (int i = 0; i < ZajednickoIme.Length; i++)
            {
                var a = ZajednickoIme.Count(c => c == ZajednickoIme[i]);
                broj.Add(a);
            }
            while (broj.Count > 2)
            {
                List<int> broj1 = new List<int>();
                int n = 0;

                for (int i = 0; i < broj.Count; i++)
                {
                    n++;
                }

                int count = n / 2;

                for (int i = 0; i < count; i++)
                {
                    int j = broj[i] + broj[(broj.Count - 1) - i];
                    broj1.Add(j);
                }

                if (n % 2 == 1)
                {
                    int j = broj[count];
                    broj1.Add(j);
                }

                int[] niz = broj1.ToArray();
                int num = 0;
                StringBuilder sb = new StringBuilder();

                foreach (int single in niz)
                {
                    string oneNum = single.ToString();
                    sb.Append(oneNum);
                }

                string final = sb.ToString();
                num = Convert.ToInt32(final);
                niz = num.ToString().Select(t => int.Parse(t.ToString())).ToArray();
                broj = ((int[])niz).ToList();
                Ljubavna.Prvi = broj[0];
                Ljubavna.Drugi = broj[1];



            }
            return Ok(new { poruka = Musko+" i "+ Zensko + 
                " vole se " + Ljubavna.Prvi + Ljubavna.Drugi + " posto." });
        }
    }
    }

    
