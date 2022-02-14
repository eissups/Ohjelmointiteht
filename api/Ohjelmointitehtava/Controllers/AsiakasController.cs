using Ennakkotehtava.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Ennakkotehtava.Controllers
{
    /**
     * AsiakasController.
     * Get:n, Post:n ja delete:n käsittely
     * Tietokantaan lisäämiset ja poistamiset
     */
    [Route("api/[controller]")]
    [ApiController]
    public class AsiakasController : ControllerBase
    {
        private readonly AsiakasContext _context;

        public AsiakasController(AsiakasContext context)
        {
            _context = context;
        }
        [HttpGet]

        /**
         * Kaikki asiakkaat
         */
        public List<Asiakas> GetAsiakkaast()
        {
            List<Asiakas> lista = _context.Asiakkaat.ToList();
            Console.WriteLine(lista.ToString());
            return lista;
        }
        [HttpGet(template: "{id}")]


        /**
         * Yksi asiasiakas id:n perusteella
         */
        public Asiakas GetAsiakas(int id)
        {
            Asiakas asiakas = _context.Asiakkaat.SingleOrDefault(asiakas => asiakas.id == id);
            return asiakas;
        }


        /**
         * Asiakkaan poistaminen
         */
        [HttpDelete(template: "{id}")]
        public IActionResult Poista(int id)
        {
            Asiakas asiakas = _context.Asiakkaat.SingleOrDefault(asiakas => asiakas.id == id);
            if (asiakas == null)
            {
                return NotFound("Asiakasta ei löydy");
            }
            _context.Asiakkaat.Remove(asiakas);
            _context.SaveChanges();
            return Ok("Asiakas poistettu");
        }
        

        /**
         * Asiakkaan lisääminen
         */
        [HttpPost]
        public async Task<ActionResult<Asiakas>> PostTodoItem(Asiakas asiakas)
        {
            Console.WriteLine(asiakas);
            _context.Asiakkaat.Add(asiakas);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAsiakas), new { id = asiakas.id }, asiakas);
        }
    }
}



