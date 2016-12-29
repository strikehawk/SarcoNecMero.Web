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
            settings.StartZoom = 10;
            settings.HomeLocation = new[] { 652000f, 6862300f };

            return settings;
        }
    }
}
