using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class PositionPanneau
    {
        public PositionPanneau()
        {
            Panneau = new HashSet<Panneau>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<Panneau> Panneau { get; set; }
    }
}
