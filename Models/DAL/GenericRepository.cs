using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace SarcoNecMero.Web.Models.DAL
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        internal SarcoNecMeroContext context;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(SarcoNecMeroContext context)
        {
            this.context = context;
            dbSet = context.Set<TEntity>();
        }

        public virtual IQueryable<TEntity> Get()
        {
            return dbSet;
        }

        public virtual TEntity GetByID(object id)
        {
            return dbSet.Find(id);
        }

        public virtual void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public virtual void Delete(object id)
        {
            TEntity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            if (context.Entry(entityToUpdate).State == EntityState.Detached)
            {
                dbSet.Attach(entityToUpdate);
            } 
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public virtual void Refresh(TEntity entity)
        {
            context.Reload(entity);
        }

        public virtual void Refresh(IEnumerable<TEntity> collection)
        {
            foreach (TEntity e in collection)
            {
                Refresh(e);
            }
        }

        public virtual void Clear()
        {
            dbSet.RemoveRange(dbSet);
        }
    }
}