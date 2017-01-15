using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class OperationArcheo
    {
        public OperationArcheo()
        {
            Identifications = new HashSet<IdentificationOperation>();
            Sarcophages = new HashSet<Sarcophage>();
        }

        public int Id { get; set; }
        public int SiteId { get; set; }
        public int? CodeCommune { get; set; }
        public double? X { get; set; }
        public double? Y { get; set; }
        public string Localisation { get; set; }
        public int? ResponsableId { get; set; }
        public int? OrganismeId { get; set; }
        public DateTime? DebutTravaux { get; set; }
        public DateTime? FinTravaux { get; set; }
        public int? PlanId { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<IdentificationOperation> Identifications { get; set; }
        public virtual ICollection<Sarcophage> Sarcophages { get; set; }
        public virtual Commune Commune { get; set; }
        public virtual Organisme Organisme { get; set; }
        public virtual Plan Plan { get; set; }
        public virtual Personne Responsable { get; set; }
        public virtual SiteArcheo Site { get; set; }
    }
}
