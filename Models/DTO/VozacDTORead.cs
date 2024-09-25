namespace EfikasnostPrijevoza_C__API.Models.DTO
{
    public record VozacDTORead
    (
        int vozac_id,
        string ime,
        string prezime,
        DateTime? datum_rodenja,
        DateTime? istek_ugovora
        );
}
