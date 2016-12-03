using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class BiblioSarcophage
    {
        public int Id { get; set; }
        public int SarcophageId { get; set; }
        public int DocumentId { get; set; }
        public string PageDebut { get; set; }
        public string PageFin { get; set; }
        public string Notes { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual Document Document { get; set; }
        public virtual Sarcophage Sarcophage { get; set; }
    }
}
