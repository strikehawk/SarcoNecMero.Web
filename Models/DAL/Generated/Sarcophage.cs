using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Sarcophage
    {
        public Sarcophage()
        {
            Bibliographie = new HashSet<BiblioSarcophage>();
            CaracterisationPlatre = new HashSet<CaracterisationPlatre>();
            Identifications = new HashSet<IdentificationSarcophage>();
            Illustrations = new HashSet<IllustrationSarcophage>();
            Panneaux = new HashSet<Panneau>();
        }

        public int Id { get; set; }
        public int SiteId { get; set; }
        public int? OperationId { get; set; }
        public byte? MiseEnOeuvreId { get; set; }
        public byte? VisibiliteCuveId { get; set; }
        public bool? ConstructionEnFosse { get; set; }
        public bool? ClayonnageParois { get; set; }
        public bool? TracesCoffrage { get; set; }
        public bool? EnduitInterieur { get; set; }
        public bool? SansFond { get; set; }
        public bool? TracesRepriseFond { get; set; }
        public bool? Perforation { get; set; }
        public bool? AmenagementCephalique { get; set; }
        public string DescAmenagementCephalique { get; set; }
        public byte? QualiteCuveId { get; set; }
        public byte? QualiteDecorCuveId { get; set; }
        public double? IndiceTrapezoidalite { get; set; }
        public double? IndiceSurbaissement { get; set; }
        public double? IndicesEpaisseur { get; set; }
        public string Notes { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<BiblioSarcophage> Bibliographie { get; set; }
        public virtual ICollection<CaracterisationPlatre> CaracterisationPlatre { get; set; }
        public virtual Couvercle Couvercle { get; set; }
        public virtual ICollection<IdentificationSarcophage> Identifications { get; set; }
        public virtual ICollection<IllustrationSarcophage> Illustrations { get; set; }
        public virtual ICollection<Panneau> Panneaux { get; set; }
        public virtual MiseEnOeuvre MiseEnOeuvre { get; set; }
        public virtual OperationArcheo Operation { get; set; }
        public virtual Qualite QualiteCuve { get; set; }
        public virtual Qualite QualiteDecorCuve { get; set; }
        public virtual SiteArcheo Site { get; set; }
        public virtual VisibiliteCuve VisibiliteCuve { get; set; }
    }
}
