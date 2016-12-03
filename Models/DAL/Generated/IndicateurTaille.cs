using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class IndicateurTaille
    {
        public IndicateurTaille()
        {
            CaracterisationPlatreTailleBullesFluidite = new HashSet<CaracterisationPlatre>();
            CaracterisationPlatreTailleBullesGachage = new HashSet<CaracterisationPlatre>();
            CaracterisationPlatreTailleCharbons = new HashSet<CaracterisationPlatre>();
            CaracterisationPlatreTailleFragGypseIncuits = new HashSet<CaracterisationPlatre>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<CaracterisationPlatre> CaracterisationPlatreTailleBullesFluidite { get; set; }
        public virtual ICollection<CaracterisationPlatre> CaracterisationPlatreTailleBullesGachage { get; set; }
        public virtual ICollection<CaracterisationPlatre> CaracterisationPlatreTailleCharbons { get; set; }
        public virtual ICollection<CaracterisationPlatre> CaracterisationPlatreTailleFragGypseIncuits { get; set; }
    }
}
