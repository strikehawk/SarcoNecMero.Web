using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SarcoNecMero.Web.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SarcoNecMero.Web.Controllers
{
    public class IReferenceSite
    {
        public int ReferentielId { get; set; }

        public string Reference { get; set; }
    }

    public class ISite
    {
        public int Id { get; set; }

        public int? CodeCommune { get; set; }

        public string Commune { get; set; }

        public int? Departement { get; set; }

        public int? X { get; set; }

        public int? Y { get; set; }

        public string Localisation { get; set; }

        public int? DebutOccupationId { get; set; }

        public int? FinOccupationId { get; set; }

        public int? PlanId { get; set; }

        //public IReferenceSite[] Identifications { get; set; }
    }

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

        [HttpPost("{id}")]
        public dynamic Post(int id, [FromBody] ISite data)
        {
            if (data == null) throw new ArgumentNullException("data");

            var site = repo.Get().Where(o => o.Id == data.Id).FirstOrDefault();

            if (site == null) return null;

            site.Localisation = data.Localisation;
            site.X = data.X;
            site.Y = data.Y;
            site.CodeCommune = data.CodeCommune;

            unitOfWork.Save();

            return GetSummarySite(site);
        }

        private dynamic GetSummarySite(SiteArcheo site)
        {
            if (site == null) return null;

            return new
            {
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
                Identifications = site.Identifications.Select(o => new
                {
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
                Identifications = op.Identifications.Select(o => new
                {
                    ReferentielId = o.ReferentielId,
                    Reference = o.Reference
                })
            };
        }
    }
}
