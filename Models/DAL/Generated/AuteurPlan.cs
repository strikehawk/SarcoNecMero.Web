using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class AuteurPlan
    {
        public int PlanId { get; set; }
        public int PersonneId { get; set; }
        public byte Rang { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual Personne Personne { get; set; }
        public virtual Plan Plan { get; set; }
    }
}
