using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class SarcoNecMeroContext
    {
        public SarcoNecMeroContext(DbContextOptions<SarcoNecMeroContext> options)
            : base(options)
        { }
    }
}
