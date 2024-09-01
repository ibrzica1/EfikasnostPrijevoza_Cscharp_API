using System.ComponentModel.DataAnnotations;

namespace EfikasnostPrijevoza_C__API.Models
{
    public class Vozaci
    {
        [Key]
        public int vozac_id { get; set; }
        public string? ime { get; set; }
        public string? prezime { get; set; }
        public DateTime? datum_rodenja { get; set; }
        public DateTime? istek_ugovora { get; set; }
    }
}
