using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class ElementSarcophage
    {
        public ElementSarcophage()
        {
            CaracterisationPlatre = new HashSet<CaracterisationPlatre>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<CaracterisationPlatre> CaracterisationPlatre { get; set; }
    }
}
