using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Auteur
    {
        public int PersonneId { get; set; }
        public int DocumentId { get; set; }
        public byte Rang { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual Document Document { get; set; }
        public virtual Personne Personne { get; set; }
    }
}
