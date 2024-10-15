using System.ComponentModel.DataAnnotations;


namespace EfikasnostPrijevoza_C__API.Models.DTO
{
    public record KamionDTOInsertUpdate
    (
        [Required(ErrorMessage ="Registracija obavezna")]
        string reg_oznaka,
            [Required(ErrorMessage = "Marka obavezna")]
            string marka,
            [Range(1950,2024,ErrorMessage = "Godina mora biti između 1950 i 2024")]
            int? godina_proizvodnje,
            DateTime? istek_registracije,
            decimal? prosjecna_potrosnja_goriva
    );
}
