using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SarcoNecMero.Web.Models.DAL
{
    public partial class SarcoNecMeroContext
    {
        public SarcoNecMeroContext(DbContextOptions<SarcoNecMeroContext> options)
            : base(options)
        { }

        //public Episode GetNextEpisode(int tvShowId)
        //{
        //    const string SQL_QUERY = "SELECT [TvShows].[fnGetNextEpisode] ({0})";
        //    Object[] parameters = { tvShowId };

        //    int? id = Database.SqlQuery<int?>(SQL_QUERY, parameters).FirstOrDefault();

        //    return !id.HasValue ? null : Episodes.Find(id);
        //}
    }
}
