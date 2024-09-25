using AutoMapper;
using EfikasnostPrijevoza_C__API.Models;
using EfikasnostPrijevoza_C__API.Models.DTO;

namespace EfikasnostPrijevoza_C__API.Mapping
{
    public class EfikasnostMappingProfile:Profile
    {
        public EfikasnostMappingProfile()
        {
            CreateMap<Kamioni, KamionDTORead>();
            CreateMap<KamionDTORead, Kamioni>();
            CreateMap<KamionDTOInsertUpdate, Kamioni>();
            CreateMap<Vozaci, VozacDTORead>();
            CreateMap<VozacDTORead, Vozaci>();
            CreateMap<VozacDTOInsertUpdate, Vozaci>();
        }
    }
}
