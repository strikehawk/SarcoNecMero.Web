using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class TypeIllustration
    {
        public TypeIllustration()
        {
            Illustration = new HashSet<Illustration>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<Illustration> Illustration { get; set; }
    }
}
