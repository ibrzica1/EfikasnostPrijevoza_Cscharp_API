namespace EfikasnostPrijevoza_C__API.Models.DTO
{
    public record KamionDTORead
    (
            int kamion_id,
            string reg_oznaka,
            string? marka,
            int? godina_proizvodnje,
            DateTime? istek_registracije,
            decimal? prosjecna_potrosnja_goriva

    );
}
