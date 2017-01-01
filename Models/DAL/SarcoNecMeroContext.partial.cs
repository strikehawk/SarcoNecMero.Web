using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class SarcoNecMeroContext
    {
        public SarcoNecMeroContext(DbContextOptions<SarcoNecMeroContext> options)
            : base(options)
        { }

        public Commune GetCommune(int x, int y)
        {
            return Commune.FromSql("SELECT * FROM Ops.Commune WHERE Code = Ops.fnGetCommune({0}, {1})", x, y)
                .FirstOrDefault();
        }
    }
}
