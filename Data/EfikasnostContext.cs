using EfikasnostPrijevoza_C__API.Models;
using Microsoft.EntityFrameworkCore;

namespace EfikasnostPrijevoza_C__API.Data
{
    public class EfikasnostContext:DbContext
    {
        public EfikasnostContext(DbContextOptions<EfikasnostContext> opcije) : base(opcije)
        {

        }

        public DbSet<Kamioni> Kamioni { get; set; }
        public DbSet<Vozaci> Vozaci { get; set; }
    }
}
