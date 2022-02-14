using Ennakkotehtava.Controllers;
using Microsoft.EntityFrameworkCore;

namespace Ennakkotehtava.Model
{
    /**
     * Context ja database
     */
    public class AsiakasContext : DbContext {
        public AsiakasContext()
        {
        }

        public AsiakasContext(DbContextOptions options):base(options) 
        { 
        }

        public DbSet<Asiakas> Asiakkaat { get; set; }
        /**

        public static void LisaaTestiAsiakas(AsiakasContext context)
        {
            Asiakas testiAsiakas = new Asiakas();
            testiAsiakas.Id = 1;
            testiAsiakas.name = "TestiAsiakas";
            context.Asiakkaat.Add(testiAsiakas);
            context.SaveChanges();
        }
        **/
    }
}
