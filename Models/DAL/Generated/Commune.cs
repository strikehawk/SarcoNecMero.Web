using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Commune
    {
        public Commune()
        {
            OperationArcheo = new HashSet<OperationArcheo>();
            SiteArcheo = new HashSet<SiteArcheo>();
        }

        public int Code { get; set; }
        public string Nom { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int Departement { get; set; }
        public int CodeRegion { get; set; }

        public virtual ICollection<OperationArcheo> OperationArcheo { get; set; }
        public virtual ICollection<SiteArcheo> SiteArcheo { get; set; }
        public virtual Departement DepartementNavigation { get; set; }
    }
}
