using System.ComponentModel.DataAnnotations;

namespace EfikasnostPrijevoza_C__API.Models.DTO
{
    public record VozacDTOInsertUpdate
    (
        [Required(ErrorMessage = "Ime obavezno")]
        string ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string prezime,
        DateTime? datum_rodenja,
        DateTime? istek_ugovora
    );
}
