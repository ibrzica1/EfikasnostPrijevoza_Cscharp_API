using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EfikasnostPrijevoza_C__API.Models
{
    public class Tura
    {
        [Key]
        public int tura_id { get; set; }
        public string? relacija { get; set; }
        public decimal? udaljenost { get; set; }
        public decimal? prijedeni_km { get; set; }
        public decimal? potrosnja_goriva { get; set; }

        [ForeignKey("kamion_id")]
        public required Kamioni Kamioni { get; set; }

        [ForeignKey("vozac_id")]
        public required Vozaci Vozaci { get; set; }
        public DateTime? datum_pocetak { get; set; }
        public DateTime? datum_zavrsetak { get; set; }



    }
}
