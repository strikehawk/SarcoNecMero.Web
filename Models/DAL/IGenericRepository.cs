using System.Collections.Generic;
using System.Linq;

namespace SarcoNecMero.Web.Models.DAL
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> Get();

        TEntity GetByID(object id);

        void Insert(TEntity entity);

        void Delete(object id);

        void Delete(TEntity entityToDelete);

        void Update(TEntity entityToUpdate);

        void Refresh(TEntity entity);

        void Refresh(IEnumerable<TEntity> collection);

        void Clear();
    }
}