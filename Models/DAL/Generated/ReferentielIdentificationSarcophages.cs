using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class ReferentielIdentificationSarcophages
    {
        public ReferentielIdentificationSarcophages()
        {
            IdentificationPanneau = new HashSet<IdentificationPanneau>();
            IdentificationSarcophage = new HashSet<IdentificationSarcophage>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<IdentificationPanneau> IdentificationPanneau { get; set; }
        public virtual ICollection<IdentificationSarcophage> IdentificationSarcophage { get; set; }
    }
}
