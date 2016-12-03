using System;
using System.Collections.Generic;

namespace SarcoNecMero.Web.Models.DAL
{
    public class UnitOfWork : IDisposable
    {
        #region Members

        private readonly SarcoNecMeroContext _context;
        private readonly Dictionary<Type, object> repositories; 

        #endregion

        #region Properties

        public SarcoNecMeroContext Context
        {
            get { return _context; }
        }

        #endregion

        #region Events
        #endregion

        #region Constructors

        public UnitOfWork(SarcoNecMeroContext context)
        {
            if (context == null) throw new ArgumentNullException("context");

            _context = context;
            repositories = new Dictionary<Type, object>();
        }

        #endregion

        public IGenericRepository<TEntity> GetRepository<TEntity>()
            where TEntity: class
        {
            Type type = typeof (TEntity);

            object repository;

            if (repositories.TryGetValue(type, out repository)) 
                return (IGenericRepository<TEntity>) repository;

            repository = new GenericRepository<TEntity>(_context);
            repositories.Add(type, repository);

            return (IGenericRepository<TEntity>)repository;
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        #region IDisposable

        private bool disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        } 

        #endregion
    }
}
