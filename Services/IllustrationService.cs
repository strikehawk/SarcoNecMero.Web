using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SarcoNecMero.Web.Services
{
    public interface IIllustrationService: IDisposable
    {
        Task<IEnumerable<IListBlobItem>> ListAsync(string path);

        Task<string> CopyAsync(string source, string destination);

        Task<string> MoveAsync(string source, string destination);
    }

    public class IllustrationService : IIllustrationService
    {
        private CloudBlobContainer container;

        public IllustrationService(string connectionString)
        {
            if (string.IsNullOrWhiteSpace(connectionString)) throw new ArgumentNullException("connectionString");
            
            container = new CloudBlobContainer(new Uri(connectionString));
        }

        public async Task<IEnumerable<IListBlobItem>> ListAsync(string path)
        {
            if (string.IsNullOrWhiteSpace(path)) throw new ArgumentNullException("path");

            var directory = container.GetDirectoryReference(path);

            BlobContinuationToken continuationToken = null;
            BlobResultSegment resultSegment = null;

            List<IListBlobItem> list = new List<IListBlobItem>();

            // Call ListBlobsSegmentedAsync recursively and enumerate the result segment returned, while the continuation token is non-null.
            // When the continuation token is null, the last segment has been returned and execution can exit the loop.
            // Note that blob snapshots cannot be listed in a hierarchical listing operation.
            do
            {
                resultSegment = await directory.ListBlobsSegmentedAsync(true, BlobListingDetails.Metadata, null, continuationToken, null, null);

                list.AddRange(resultSegment.Results);

                // Get the continuation token, if there are additional segments of results.
                continuationToken = resultSegment.ContinuationToken;

            } while (continuationToken != null);

            return list;
        }

        public async Task<string> CopyAsync(string source, string destination)
        {
            if (string.IsNullOrWhiteSpace(source)) throw new ArgumentNullException("source");
            if (string.IsNullOrWhiteSpace(destination)) throw new ArgumentNullException("destination");

            CloudBlockBlob srcBlob = container.GetBlockBlobReference(source);
            CloudBlockBlob destBlob = container.GetBlockBlobReference(destination);

            return await destBlob.StartCopyAsync(srcBlob);
        }

        public async Task<string> MoveAsync(string source, string destination)
        {
            if (string.IsNullOrWhiteSpace(source)) throw new ArgumentNullException("source");
            if (string.IsNullOrWhiteSpace(destination)) throw new ArgumentNullException("destination");

            CloudBlockBlob srcBlob = container.GetBlockBlobReference(source);
            CloudBlockBlob destBlob = container.GetBlockBlobReference(destination);

            string result = await destBlob.StartCopyAsync(srcBlob);

            await srcBlob.DeleteAsync();

            return result;
        }

        public void Dispose()
        {
            container = null;
        }
    }
}
