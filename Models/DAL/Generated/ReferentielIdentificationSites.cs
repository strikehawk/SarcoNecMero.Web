using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class ReferentielIdentificationSites
    {
        public ReferentielIdentificationSites()
        {
            IdentificationOperation = new HashSet<IdentificationOperation>();
            IdentificationSite = new HashSet<IdentificationSite>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<IdentificationOperation> IdentificationOperation { get; set; }
        public virtual ICollection<IdentificationSite> IdentificationSite { get; set; }
    }
}
