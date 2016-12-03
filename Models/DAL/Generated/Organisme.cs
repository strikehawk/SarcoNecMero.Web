using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Organisme
    {
        public Organisme()
        {
            OperationArcheo = new HashSet<OperationArcheo>();
            Personne = new HashSet<Personne>();
        }

        public int Id { get; set; }
        public string Nom { get; set; }
        public string Abreviation { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<OperationArcheo> OperationArcheo { get; set; }
        public virtual ICollection<Personne> Personne { get; set; }
    }
}
