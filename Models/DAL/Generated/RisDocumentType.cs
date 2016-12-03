using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class RisDocumentType
    {
        public byte TypeDocumentId { get; set; }
        public string Code { get; set; }

        public virtual TypeDocument TypeDocument { get; set; }
    }
}
