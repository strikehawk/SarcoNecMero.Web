using Microsoft.AspNetCore.Mvc;
using SarcoNecMero.Web.Models.DAL;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Controllers
{
    [Route("api/ops/common")]
    public class OpsCommonController : DataController
    {
        public OpsCommonController(UnitOfWork unitOfWork) :
            base(unitOfWork)
        {
        }

        [HttpGet("[action]")]
        public IEnumerable<Commune> Commune()
        {
            var repo = unitOfWork.GetRepository<Commune>();
            return repo.Get();
        }

        [HttpGet("[action]")]
        public IEnumerable<Departement> Departement()
        {
            var repo = unitOfWork.GetRepository<Departement>();
            return repo.Get();
        }

        [HttpGet("[action]")]
        public IEnumerable<ReferentielIdentificationSites> ReferentielIdentification()
        {
            var repo = unitOfWork.GetRepository<ReferentielIdentificationSites>();
            return repo.Get();
        }
    }
}
