using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class TypeDocument
    {
        public TypeDocument()
        {
            Document = new HashSet<Document>();
        }

        public byte Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<Document> Document { get; set; }
        public virtual RisDocumentType RisDocumentType { get; set; }
    }
}
