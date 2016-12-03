using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class TypeCouvercle
    {
        public TypeCouvercle()
        {
            Couvercle = new HashSet<Couvercle>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<Couvercle> Couvercle { get; set; }
    }
}
