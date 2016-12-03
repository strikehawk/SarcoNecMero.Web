using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SarcoNecMero.Web.Models.DAL;
using System.Collections.Generic;
using System.Linq;

namespace SarcoNecMero.Web.Controllers
{
    [Route("api/ops/sites")]
    public class SiteArcheoController : DataController
    {
        private IGenericRepository<SiteArcheo> repo;

        public SiteArcheoController(UnitOfWork unitOfWork) :
            base(unitOfWork)
        {
            repo = unitOfWork.GetRepository<SiteArcheo>();
        }

        [HttpGet("[action]")]
        public IEnumerable<dynamic> Summary()
        {
            return repo.Get().Include(o => o.Identifications).Select(GetSummarySite);
        }

        [HttpGet("{id}")]
        public SiteArcheo Get(int id)
        {
            return repo.GetByID(id);
        }

        private dynamic GetSummarySite(SiteArcheo site)
        {
            if (site == null) return null;

            return new {
                Id = site.Id,
                CodeCommune = site.CodeCommune,
                X = site.X,
                Y = site.Y,
                Localisation = site.Localisation,
                DebutOccupationId = site.DebutOccupationId,
                FinOccupationId = site.FinOccupationId,
                PlanId = site.PlanId,
                Identifications = site.Identifications.Select(o => new {
                    ReferentielId = o.ReferentielId,
                    Reference = o.Reference
                })
            };
        }
    }
}
