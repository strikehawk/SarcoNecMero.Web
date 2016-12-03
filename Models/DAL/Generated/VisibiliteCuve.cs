using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class VisibiliteCuve
    {
        public VisibiliteCuve()
        {
            Sarcophage = new HashSet<Sarcophage>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<Sarcophage> Sarcophage { get; set; }
    }
}
