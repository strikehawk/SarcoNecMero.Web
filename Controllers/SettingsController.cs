using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SarcoNecMero.Web.Models.Configuration;
using SarcoNecMero.Web.Models.Settings;

namespace SarcoNecMero.Web.Controllers
{
    [Route("api/settings")]
    public class SettingsController : Controller
    {
        private IOptions<BlobStorageConfiguration> _storageConfig;

        public SettingsController(IOptions<BlobStorageConfiguration> storageConfig)
        {
            _storageConfig = storageConfig;
        }

        [HttpGet("[action]")]
        public DefaultSettings Default()
        {
            var settings = new DefaultSettings();
            settings.OpsReferentialId = 1;
            settings.StartZoom = 10;
            settings.HomeLocation = new[] { 652000f, 6862300f };
            settings.IllustrationStorageRootUrl = _storageConfig.Value.IllustrationsRootUrl;

            return settings;
        }
    }
}
