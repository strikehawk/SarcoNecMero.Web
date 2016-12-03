using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Illustration
    {
        public Illustration()
        {
            IllustrationCouvercle = new HashSet<IllustrationCouvercle>();
            IllustrationPanneau = new HashSet<IllustrationPanneau>();
            IllustrationSarcophage = new HashSet<IllustrationSarcophage>();
        }

        public int Id { get; set; }
        public byte TypeId { get; set; }
        public string Chemin { get; set; }
        public string Auteur { get; set; }
        public int? DocumentId { get; set; }
        public string Page { get; set; }
        public string Notes { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<IllustrationCouvercle> IllustrationCouvercle { get; set; }
        public virtual ICollection<IllustrationPanneau> IllustrationPanneau { get; set; }
        public virtual ICollection<IllustrationSarcophage> IllustrationSarcophage { get; set; }
        public virtual Document Document { get; set; }
        public virtual TypeIllustration Type { get; set; }
    }
}
