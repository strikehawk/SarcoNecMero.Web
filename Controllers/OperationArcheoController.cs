using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SarcoNecMero.Web.Models.DAL;
using System.Collections.Generic;
using System.Linq;

namespace SarcoNecMero.Web.Controllers
{
    [Route("api/ops/operations")]
    public class OperationArcheoController : DataController
    {
        private IGenericRepository<OperationArcheo> repo;

        public OperationArcheoController(UnitOfWork unitOfWork) :
            base(unitOfWork)
        {
            repo = unitOfWork.GetRepository<OperationArcheo>();
        }

        [HttpGet("site/{siteId}")]
        public IEnumerable<dynamic> GetBySite(int siteId)
        {
            return repo.Get()
                .Where(o => o.SiteId == siteId)
                .Include(o => o.Commune)
                .Include(o => o.Identifications)
                .Include(o => o.Responsable)
                .Include(o => o.Organisme)
                .Select(GetSummaryOperation);
        }

        [HttpGet("{id}")]
        public OperationArcheo Get(int id)
        {
            return repo.GetByID(id);
        }

        private dynamic GetSummaryOperation(OperationArcheo op)
        {
            if (op == null) return null;

            return new
            {
                Id = op.Id,
                SiteId = op.SiteId,
                CodeCommune = op.CodeCommune,
                Commune = op.Commune != null ? op.Commune.Nom : null,
                Departement = op.Commune != null ? (int?)op.Commune.Departement : null,
                X = op.X,
                Y = op.Y,
                Localisation = op.Localisation,
                Responsable = op.Responsable != null ? new {
                    Id = op.ResponsableId,
                    Prenom = op.Responsable.Prenom,
                    AutresPrenoms = op.Responsable.AutresPrenoms,
                    Nom = op.Responsable.Nom,
                    Suffixe = op.Responsable.Suffixe,
                    NomComplet = op.Responsable.NomComplet
                } : null,
                Organisme = op.Organisme != null ? op.Organisme.Nom : null,
                DebutTravaux = op.DebutTravaux,
                FinTravaux = op.FinTravaux,
                PlanId = op.PlanId,
                Identifications = op.Identifications.Select(o => new {
                    ReferentielId = o.ReferentielId,
                    Reference = o.Reference,
                    Nom = o.Nom
                })
            };
        }
    }
}
