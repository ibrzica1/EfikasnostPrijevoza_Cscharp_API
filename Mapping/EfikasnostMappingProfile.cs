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
            CreateMap<Tura, TuraDTORead>()
                .ForCtorParam("kamion_reg", opt => opt.MapFrom(src => src.Kamioni.reg_oznaka))
                .ForCtorParam("vozac_prezime", opt => opt.MapFrom(src => src.Vozaci.prezime));   
            CreateMap<Tura, TuraDTOInsertUpdate>()
                .ForMember(dest => dest.Kamion_id, opt => opt.MapFrom(src => src.Kamioni.kamion_id))
                .ForMember(dest => dest.Vozac_id, opt => opt.MapFrom(src => src.Vozaci.vozac_id))
                .ForCtorParam("Kamion_id", opt => opt.MapFrom(src => src.Kamioni.kamion_id))
                .ForCtorParam("Vozac_id", opt => opt.MapFrom(src => src.Vozaci.vozac_id));
            CreateMap<TuraDTOInsertUpdate, Tura>();
        }
    }
}
