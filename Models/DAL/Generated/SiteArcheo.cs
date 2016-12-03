using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class SiteArcheo
    {
        public SiteArcheo()
        {
            Identifications = new HashSet<IdentificationSite>();
            Operations = new HashSet<OperationArcheo>();
            Sarcophages = new HashSet<Sarcophage>();
        }

        public int Id { get; set; }
        public int? CodeCommune { get; set; }
        public double? X { get; set; }
        public double? Y { get; set; }
        public string Localisation { get; set; }
        public byte? DebutOccupationId { get; set; }
        public byte? FinOccupationId { get; set; }
        public int? PlanId { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<IdentificationSite> Identifications { get; set; }
        public virtual ICollection<OperationArcheo> Operations { get; set; }
        public virtual ICollection<Sarcophage> Sarcophages { get; set; }
        public virtual Commune Commune { get; set; }
        public virtual PhaseChronologique DebutOccupation { get; set; }
        public virtual PhaseChronologique FinOccupation { get; set; }
        public virtual Plan Plan { get; set; }
    }
}
