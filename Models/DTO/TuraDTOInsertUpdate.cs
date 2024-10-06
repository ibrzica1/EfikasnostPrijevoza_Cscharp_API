using System.ComponentModel.DataAnnotations;

namespace EfikasnostPrijevoza_C__API.Models.DTO
{
    

    public record TuraDTOInsertUpdate
    (
        string? relacija,
        decimal? udaljenost,
        decimal? prijedeni_km,
        decimal? potrosnja_goriva,
        int? Kamion_id,
        int? Vozac_id,
        DateTime? datum_pocetak,
        DateTime? datum_zavrsetak
        
        );
   
}
