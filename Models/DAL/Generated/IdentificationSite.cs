using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class IdentificationSite
    {
        public int SiteId { get; set; }
        public byte ReferentielId { get; set; }
        public string Reference { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ReferentielIdentificationSites Referentiel { get; set; }
        public virtual SiteArcheo Site { get; set; }
    }
}
