using EfikasnostPrijevoza_C__API.Models;
using Microsoft.EntityFrameworkCore;

namespace EfikasnostPrijevoza_C__API.Data
{
    public class EfikasnostContext : DbContext
    {
        public EfikasnostContext(DbContextOptions<EfikasnostContext> opcije) : base(opcije)
        {

        }

        public DbSet<Kamioni> Kamioni { get; set; }
        public DbSet<Vozaci> Vozaci { get; set; }
        public DbSet<Tura> Tura { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tura>()
                .HasOne(t => t.Kamioni);
                



            modelBuilder.Entity<Tura>()
                .HasOne(t => t.Vozaci);
                
        }

    }
}
