using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class PhaseChronologique
    {
        public byte Id { get; set; }
        public string Code { get; set; }
        public string Nom { get; set; }
        public int Debut { get; set; }
        public int Fin { get; set; }
    }
}
