using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SarcoNecMero.Web.Models.DAL;
using System.Collections.Generic;
using System.Linq;

namespace SarcoNecMero.Web.Controllers
{
    [Route("api/pers")]
    public class PersController : DataController
    {
        private IGenericRepository<Personne> repoPersonne;
        private IGenericRepository<Organisme> repoOrganisme;

        public PersController(UnitOfWork unitOfWork) :
            base(unitOfWork)
        {
            repoPersonne = unitOfWork.GetRepository<Personne>();
            repoOrganisme = unitOfWork.GetRepository<Organisme>();
        }

        #region Personne
        [Route("personne")]
        public IEnumerable<Personne> GetPersonne()
        {
            return repoPersonne.Get();
        }
        #endregion

        #region Organisme
        [Route("organisme")]
        public IEnumerable<Organisme> GetOrganisme()
        {
            return repoOrganisme.Get();
        }
        #endregion
    }
}
