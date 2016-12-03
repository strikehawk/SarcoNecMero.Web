using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Qualite
    {
        public Qualite()
        {
            SarcophageQualiteCuve = new HashSet<Sarcophage>();
            SarcophageQualiteDecorCuve = new HashSet<Sarcophage>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<Sarcophage> SarcophageQualiteCuve { get; set; }
        public virtual ICollection<Sarcophage> SarcophageQualiteDecorCuve { get; set; }
    }
}
