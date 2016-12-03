using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Departement
    {
        public Departement()
        {
            Communes = new HashSet<Commune>();
        }

        public int Numero { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<Commune> Communes { get; set; }
    }
}
