using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using SarcoNecMero.Web.Models.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace SarcoNecMero.Web.Controllers
{
    public class IReferenceSite
    {
        public int ReferentielId { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "La référence du site ne peut pas être vide.")]
        [StringLength(50, ErrorMessage = "La référence du site peut contenir 50 caractères maximum.")]
        public string Reference { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Le nom du site ne peut pas être vide.")]
        [StringLength(250, ErrorMessage = "Le nom du site peut contenir 250 caractères maximum.")]
        public string Nom { get; set; }
    }

    public class ISite
    {
        public int Id { get; set; }

        public int? CodeCommune { get; set; }

        public string Commune { get; set; }

        public int? Departement { get; set; }

        public int? X { get; set; }

        public int? Y { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Le nom du site ne peut pas être vide.")]
        [StringLength(250, ErrorMessage = "Le nom du site peut contenir 250 caractères maximum.")]
        public string Localisation { get; set; }

        public int? PlanId { get; set; }

        public IReferenceSite[] Identifications { get; set; }
    }

    [Route("api/ops/sites")]
    public class SiteArcheoController : DataController
    {
        private IGenericRepository<SiteArcheo> repo;
        private IGenericRepository<Commune> repoCommune;

        public SiteArcheoController(UnitOfWork unitOfWork) :
            base(unitOfWork)
        {
            repo = unitOfWork.GetRepository<SiteArcheo>();
            repoCommune = unitOfWork.GetRepository<Commune>();
        }

        [HttpGet("[action]")]
        public IEnumerable<dynamic> Summary()
        {
            return repo.Get()
                .Include(o => o.Commune)
                .OrderBy(o => o.Commune.Departement).ThenBy(o => o.Commune.Nom)
                .ThenBy(o => o.Localisation)
                .Include(o => o.Identifications)
                //.Include(o => o.Operations)
                //.Include(o => o.Operations).ThenInclude(op => op.Commune)
                //.Include(o => o.Operations).ThenInclude(op => op.Identifications)
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
                .Select(GetSummarySite)
                .FirstOrDefault();
        }

        [HttpPost("{id}")]
        public dynamic Post(int id, [FromBody] ISite data)
        {
            if (data == null) throw new ArgumentNullException("data");

            if (!ModelState.IsValid)
            {
                return new
                {
                    Messages = ModelState.Values
                    .Where(o => o.ValidationState == ModelValidationState.Invalid)
                    .SelectMany(o => o.Errors)
                    .Select(o => o.ErrorMessage)
                    .ToArray()
                };
            }

            var site = repo.Get().Where(o => o.Id == data.Id).FirstOrDefault();
            var commune = repoCommune.GetByID(data.CodeCommune);
            site.Commune = commune;

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
                PlanId = site.PlanId,
                Identifications = site.Identifications.Select(o => new
                {
                    ReferentielId = o.ReferentielId,
                    Reference = o.Reference,
                    Nom = o.Nom
                })
            };
        }
    }
}
