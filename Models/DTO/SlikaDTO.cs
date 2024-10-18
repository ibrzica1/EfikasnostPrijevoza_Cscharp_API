using System.ComponentModel.DataAnnotations;

namespace EfikasnostPrijevoza_C__API.Models.DTO
{
    public record SlikaDTO([Required
        (ErrorMessage = "Base64 zapis slike obavezno")] string Base64);

}
