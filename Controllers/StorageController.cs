using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage.Blob;
using SarcoNecMero.Web.Models.DAL;
using SarcoNecMero.Web.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SarcoNecMero.Web.Controllers
{
    public class StorageController : DataController
    {
        private IIllustrationService illusSvc;

        public StorageController(UnitOfWork unitOfWork, IIllustrationService illusSvc) :
            base(unitOfWork)
        {
            this.illusSvc = illusSvc;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> StageIllustrations()
        {
            string path = "staging/sarcos";

            var dicPaths = await ListBlobs(path);
            var dicIllus = GetIllustrationDictionary();

            int siteId;
            string currentPath;
            string newPath;
            Task<string> task;

            List<Task<string>> tasks = new List<Task<string>>();
            foreach (var kvp in dicIllus)
            {
                siteId = kvp.Value;
                if (dicPaths.TryGetValue(kvp.Key, out currentPath))
                {
                    //Blob with same name as illustration has been found
                    newPath = string.Format("sarcos/{0}/{1}", kvp.Value, kvp.Key);
                    task = illusSvc.MoveAsync(currentPath, newPath);

                    tasks.Add(task);
                }
            }

            Task.WaitAll(tasks.ToArray());

            return Ok();
        }

        private Dictionary<string, int> GetIllustrationDictionary()
        {
            var siteRepo = unitOfWork.GetRepository<SiteArcheo>();
            var query = siteRepo.Get();

            var illustrations = from site in query
                                from sarco in site.Sarcophages
                                from panneau in sarco.Panneaux
                                from illus in panneau.Illustrations
                                select new KeyValuePair<string, int>(illus.Illustration.Chemin, site.Id);

            var dic = illustrations.ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

            return dic;
        }

        private void ProcessSite(SiteArcheo site)
        {
            int id = site.Id;
            string[] chemins = site.Sarcophages.SelectMany(o => o.Panneaux).SelectMany(o => o.Illustrations).Select(o => o.Illustration.Chemin).ToArray();
        }

        private async Task<Dictionary<string, string>> ListBlobs(string path)
        {
            var list = await illusSvc.ListAsync(path);

            CloudBlockBlob blob;
            string prefix;
            string fileName;

            Dictionary<string, string> dicPaths = new Dictionary<string, string>();

            foreach (var item in list)
            {
                if (item.GetType() == typeof(CloudBlockBlob))
                {
                    blob = (CloudBlockBlob)item;
                    prefix = blob.Parent.Prefix;
                    fileName = blob.Name.Substring(prefix.Length);
                    dicPaths.Add(fileName, blob.Name);
                }
            }

            return dicPaths;
        }
    }
}
