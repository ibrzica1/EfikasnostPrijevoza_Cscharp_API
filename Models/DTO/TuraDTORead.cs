namespace EfikasnostPrijevoza_C__API.Models.DTO
{
    public record TuraDTORead
    (
            int tura_id,
            string? relacija,
            decimal? udaljenost,
            decimal? prijedeni_km,
            decimal? potrosnja_goriva,
            string? kamion_reg,
            string? vozac_prezime,
            DateTime? datum_pocetak,
            DateTime? datum_zavrsetak

    );
}
