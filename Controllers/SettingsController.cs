using Microsoft.AspNetCore.Mvc;
using SarcoNecMero.Web.Models.Settings;

namespace SarcoNecMero.Web.Controllers
{
    [Route("api/settings")]
    public class SettingsController : Controller
    {
        [HttpGet("[action]")]
        public DefaultSettings Default()
        {
            var settings = new DefaultSettings();
            settings.OpsReferentialId = 1;

            return settings;
        }
    }
}
