using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class ExemplaireDocument
    {
        public int DocumentId { get; set; }
        public int BibliothequeId { get; set; }
        public bool? EstPresent { get; set; }
        public string Reference { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual Bibliotheque Bibliotheque { get; set; }
        public virtual Document Document { get; set; }
    }
}
