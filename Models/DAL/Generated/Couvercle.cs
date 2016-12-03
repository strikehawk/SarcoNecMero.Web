using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Couvercle
    {
        public Couvercle()
        {
            IllustrationCouvercle = new HashSet<IllustrationCouvercle>();
        }

        public int SarcophageId { get; set; }
        public byte TypeId { get; set; }
        public bool EstDecore { get; set; }
        public string DescriptionDecor { get; set; }
        public bool TracesDecor { get; set; }
        public string DescriptionTracesDecor { get; set; }
        public bool PresenceArmatures { get; set; }
        public string Notes { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<IllustrationCouvercle> IllustrationCouvercle { get; set; }
        public virtual Sarcophage Sarcophage { get; set; }
        public virtual TypeCouvercle Type { get; set; }
    }
}
