using Microsoft.AspNetCore.Mvc;
using SarcoNecMero.Web.Models.DAL;
using System.Collections.Generic;
using System.Linq;

namespace SarcoNecMero.Web.Controllers
{
    [Route("api/chrono")]
    public class ChronoController : DataController
    {
        private IGenericRepository<PhaseChronologique> repo;

        public ChronoController(UnitOfWork unitOfWork) :
            base(unitOfWork)
        {
            repo = unitOfWork.GetRepository<PhaseChronologique>();
        }

        [HttpGet("phase")]
        public IEnumerable<dynamic> Get()
        {
            return repo.Get().Select(GetPhase);
        }

        private dynamic GetPhase(PhaseChronologique phase)
        {
            if (phase == null) return null;

            return new
            {
                Id = phase.Id,
                Code = phase.Code,
                Nom = phase.Nom,
                Debut = phase.Debut,
                Fin = phase.Fin
            };
        }
    }
}
