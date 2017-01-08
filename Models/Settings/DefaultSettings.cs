namespace SarcoNecMero.Web.Models.Settings
{
    public class DefaultSettings
    {
        /// <summary>
        /// The Id of the Referential to use when displaying Sites or Operations.
        /// </summary>
        public int OpsReferentialId { get; set; }

        /// <summary>
        /// The starting zoom level of the map.
        /// </summary>
        public int StartZoom { get; set; }

        /// <summary>
        /// The starting center of the map, in EPSG:2154.
        /// </summary>
        public float[] HomeLocation { get; set; }

        /// <summary>
        /// The root URL of the illustration storage container.
        /// </summary>
        public string IllustrationStorageRootUrl { get; set; }
    }
}
