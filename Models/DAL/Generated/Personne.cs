using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Personne
    {
        public Personne()
        {
            Auteur = new HashSet<Auteur>();
            AuteurPlan = new HashSet<AuteurPlan>();
        }

        public int Id { get; set; }
        public string Prenom { get; set; }
        public string AutresPrenoms { get; set; }
        public string Nom { get; set; }
        public string Suffixe { get; set; }
        public string NomComplet { get; set; }
        public int? OrganismeId { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<Auteur> Auteur { get; set; }
        public virtual ICollection<AuteurPlan> AuteurPlan { get; set; }
        public virtual Organisme Organisme { get; set; }
    }
}
