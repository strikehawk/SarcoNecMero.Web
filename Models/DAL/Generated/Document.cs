using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class Document
    {
        public Document()
        {
            Auteurs = new HashSet<Auteur>();
            Panneaux = new HashSet<BiblioPanneau>();
            Sarcophages = new HashSet<BiblioSarcophage>();
            Exemplaires = new HashSet<ExemplaireDocument>();
            Illustrations = new HashSet<Illustration>();
            Plans = new HashSet<Plan>();
        }

        public int Id { get; set; }
        public byte TypeDocumentId { get; set; }
        public int? ParentId { get; set; }
        public string Titre { get; set; }
        public string Titre2 { get; set; }
        public string Editeur { get; set; }
        public DateTime? DateEdition { get; set; }
        public string LieuEdition { get; set; }
        public int? NbrePages { get; set; }
        public int? PageDebut { get; set; }
        public int? PageFin { get; set; }
        public int? NoVolume { get; set; }
        public int? NoPeriodique { get; set; }
        public DateTime? DatePeriodique { get; set; }
        public string Notes { get; set; }
        public string Url { get; set; }
        public string TypeIdentifiant { get; set; }
        public string Identifiant { get; set; }
        public string Tags { get; set; }
        public Guid UniqueTag { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ICollection<Auteur> Auteurs { get; set; }
        public virtual ICollection<BiblioPanneau> Panneaux { get; set; }
        public virtual ICollection<BiblioSarcophage> Sarcophages { get; set; }
        public virtual ICollection<ExemplaireDocument> Exemplaires { get; set; }
        public virtual ICollection<Illustration> Illustrations { get; set; }
        public virtual ICollection<Plan> Plans { get; set; }
        public virtual Document Parent { get; set; }
        public virtual ICollection<Document> InverseParent { get; set; }
        public virtual TypeDocument TypeDocument { get; set; }
    }
}
