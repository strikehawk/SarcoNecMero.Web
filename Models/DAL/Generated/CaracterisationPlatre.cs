using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class CaracterisationPlatre
    {
        public int Id { get; set; }
        public int SarcophageId { get; set; }
        public byte ElementSarcophageId { get; set; }
        public byte FinesseId { get; set; }
        public bool Charbons { get; set; }
        public byte? TailleCharbonsId { get; set; }
        public bool FragGypseIncuits { get; set; }
        public byte? TailleFragGypseIncuitsId { get; set; }
        public bool BullesFluidite { get; set; }
        public byte? TailleBullesFluiditeId { get; set; }
        public bool BullesGachage { get; set; }
        public byte? TailleBullesGachageId { get; set; }
        public bool Sable { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ElementSarcophage ElementSarcophage { get; set; }
        public virtual FinessePlatre Finesse { get; set; }
        public virtual Sarcophage Sarcophage { get; set; }
        public virtual IndicateurTaille TailleBullesFluidite { get; set; }
        public virtual IndicateurTaille TailleBullesGachage { get; set; }
        public virtual IndicateurTaille TailleCharbons { get; set; }
        public virtual IndicateurTaille TailleFragGypseIncuits { get; set; }
    }
}
