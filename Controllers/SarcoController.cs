using Microsoft.AspNetCore.Mvc;
using SarcoNecMero.Web.Models.DAL;
using SarcoNecMero.Web.Models.DAL.Sarcos;
using System.Linq;

namespace SarcoNecMero.Web.Controllers
{
    [Route("api/sarcos")]
    public class SarcoController : DataController
    {
        public SarcoController(UnitOfWork unitOfWork) :
            base(unitOfWork)
        {
        }

        [HttpGet("{id}/panneaux/illus/summary")]
        public IllustrationPanneauSummary[] GetIllustrationsPanneaux(int id)
        {
            return unitOfWork.Context.GetIllustrationsPanneaux(id)
                .OrderBy(o => o.ReferenceSarco)
                .ToArray();
        }
    }
}
