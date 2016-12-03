using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Panneau
    {
        public Panneau()
        {
            Bibliographie = new HashSet<BiblioPanneau>();
            Identifications = new HashSet<IdentificationPanneau>();
            Illustrations = new HashSet<IllustrationPanneau>();
        }

        public int Id { get; set; }
        public int SarcophageId { get; set; }
        public byte? PositionId { get; set; }
        public double? Longueur { get; set; }
        public bool LongueurPartielle { get; set; }
        public double? Hauteur { get; set; }
        public bool HauteurPartielle { get; set; }
        public double? Epaisseur { get; set; }
        public bool EpaisseurPartielle { get; set; }
        public bool? Perforation { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<BiblioPanneau> Bibliographie { get; set; }
        public virtual ICollection<IdentificationPanneau> Identifications { get; set; }
        public virtual ICollection<IllustrationPanneau> Illustrations { get; set; }
        public virtual PositionPanneau Position { get; set; }
        public virtual Sarcophage Sarcophage { get; set; }
    }
}
