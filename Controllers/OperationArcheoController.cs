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

        [HttpGet()]
        public IEnumerable<dynamic> Get()
        {
            return repo.Get().Include(o => o.Identifications).Select(GetOperationVM);
        }

        [HttpGet("{id}")]
        public OperationArcheo Get(int id)
        {
            return repo.GetByID(id);
        }

        private dynamic GetOperationVM(OperationArcheo op)
        {
            if (op == null) return null;

            return new
            {
                Id = op.Id,
                SiteId = op.SiteId,
                CodeCommune = op.CodeCommune,
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
