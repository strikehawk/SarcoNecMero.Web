using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class PhaseChronologique
    {
        public PhaseChronologique()
        {
            OperationArcheoDebutOccupation = new HashSet<OperationArcheo>();
            OperationArcheoFinOccupation = new HashSet<OperationArcheo>();
            SiteArcheoDebutOccupation = new HashSet<SiteArcheo>();
            SiteArcheoFinOccupation = new HashSet<SiteArcheo>();
        }

        public byte Id { get; set; }
        public string Code { get; set; }
        public string Nom { get; set; }
        public int Debut { get; set; }
        public int Fin { get; set; }

        public virtual ICollection<OperationArcheo> OperationArcheoDebutOccupation { get; set; }
        public virtual ICollection<OperationArcheo> OperationArcheoFinOccupation { get; set; }
        public virtual ICollection<SiteArcheo> SiteArcheoDebutOccupation { get; set; }
        public virtual ICollection<SiteArcheo> SiteArcheoFinOccupation { get; set; }
    }
}
