using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Plan
    {
        public Plan()
        {
            AuteurPlan = new HashSet<AuteurPlan>();
            OperationArcheo = new HashSet<OperationArcheo>();
            SiteArcheo = new HashSet<SiteArcheo>();
        }

        public int Id { get; set; }
        public string Chemin { get; set; }
        public DateTime? DateRealisation { get; set; }
        public int? DocumentId { get; set; }
        public int? Page { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<AuteurPlan> AuteurPlan { get; set; }
        public virtual ICollection<OperationArcheo> OperationArcheo { get; set; }
        public virtual ICollection<SiteArcheo> SiteArcheo { get; set; }
        public virtual Document Document { get; set; }
    }
}
