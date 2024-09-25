using AutoMapper;
using EfikasnostPrijevoza_C__API.Data;
using EfikasnostPrijevoza_C__API.Models;
using Microsoft.AspNetCore.Mvc;

namespace EfikasnostPrijevoza_C__API.Controllers
{
    public abstract class EfikasnostController:ControllerBase
    {
        protected readonly EfikasnostContext _context;
        protected readonly IMapper _mapper;

        public EfikasnostController(EfikasnostContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
