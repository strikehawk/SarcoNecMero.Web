using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class IllustrationPanneau
    {
        public int Id { get; set; }
        public int IllustrationId { get; set; }
        public int PanneauId { get; set; }
        public bool Principale { get; set; }
        public bool EstInterieur { get; set; }
        public string Notes { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual Illustration Illustration { get; set; }
        public virtual Panneau Panneau { get; set; }
    }
}
