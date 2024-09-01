using System.ComponentModel.DataAnnotations;

namespace EfikasnostPrijevoza_C__API.Models
{
    public class Kamioni
    {
        [Key]
        public int kamion_id { get; set; }
        public string? reg_oznaka { get; set; }
        public string? marka { get; set; }
        public int? godina_proizvodnje { get; set; }
        public DateTime istek_registracije { get; set; }
        public decimal? prosjecna_potrosnja_goriva { get; set; }
    }
}
