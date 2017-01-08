using Microsoft.EntityFrameworkCore;
using SarcoNecMero.Web.Models.DAL.Sarcos;
using System.Linq;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class SarcoNecMeroContext
    {
        public virtual DbSet<IllustrationPanneauSummary> IllustrationPanneauSummary { get; set; }

        public IQueryable<IllustrationPanneauSummary> GetIllustrationsPanneaux(int siteId)
        {
            return IllustrationPanneauSummary.FromSql("SELECT * FROM Sarcos.fnGetIllustrationsPanneaux({0})", siteId);
        }
    }
}
