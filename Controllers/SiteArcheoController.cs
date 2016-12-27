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
            return repo.Get()
                .Include(o => o.Commune)
                .OrderBy(o => o.Commune.Departement).ThenBy(o => o.Commune.Nom)
                .ThenBy(o => o.Localisation)
                .Include(o => o.Identifications)
                .Include(o => o.Operations)
                .Include(o => o.Operations).ThenInclude(op => op.Commune)
                .Include(o => o.Operations).ThenInclude(op => op.Identifications)
                .Select(GetSummarySite);
        }

        [HttpGet("{id}")]
        public dynamic Get(int id)
        {
            return repo.Get()
                .Where(o => o.Id == id)
                .Include(o => o.Commune)
                .OrderBy(o => o.Commune.Departement).ThenBy(o => o.Commune.Nom)
                .ThenBy(o => o.Localisation)
                .Include(o => o.Identifications)
                .Include(o => o.Operations)
                .Include(o => o.Operations).ThenInclude(op => op.Commune)
                .Include(o => o.Operations).ThenInclude(op => op.Identifications)
                .Select(GetSummarySite)
                .FirstOrDefault();
        }

        private dynamic GetSummarySite(SiteArcheo site)
        {
            if (site == null) return null;

            return new {
                Id = site.Id,
                CodeCommune = site.CodeCommune,
                Commune = site.Commune != null ? site.Commune.Nom : string.Empty,
                Departement = site.Commune != null ? (int?)site.Commune.Departement : null,
                X = site.X,
                Y = site.Y,
                Localisation = site.Localisation,
                DebutOccupationId = site.DebutOccupationId,
                FinOccupationId = site.FinOccupationId,
                PlanId = site.PlanId,
                Operations = site.Operations.Select(GetOperation),
                Identifications = site.Identifications.Select(o => new {
                    ReferentielId = o.ReferentielId,
                    Reference = o.Reference
                })
            };
        }

        private dynamic GetOperation(OperationArcheo op)
        {
            if (op == null) return null;

            return new
            {
                Id = op.Id,
                SiteId = op.SiteId,
                CodeCommune = op.CodeCommune,
                Commune = op.Commune != null ? op.Commune.Nom : string.Empty,
                Departement = op.Commune != null ? (int?)op.Commune.Departement : null,
                X = op.X,
                Y = op.Y,
                Localisation = op.Localisation,
                ResponsableId = op.ResponsableId,
                OrganismeId = op.OrganismeId,
                DebutTravaux = op.DebutTravaux,
                FinTravaux = op.FinTravaux,
                DebutOccupationId = op.DebutOccupationId,
                FinOccupationId = op.FinOccupationId,
                PlanId = op.PlanId,
                Identifications = op.Identifications.Select(o => new {
                    ReferentielId = o.ReferentielId,
                    Reference = o.Reference
                })
            };
        }
    }
}
