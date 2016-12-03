using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace SarcoNecMero.Web.Models.DAL
{
    /// <summary>
    /// https://weblogs.asp.net/ricardoperes/implementing-missing-features-in-entity-framework-core
    /// </summary>
    public static class DbContextExtensions
    {
        //public static TEntity Find<TEntity>(this DbSet<TEntity> set, params object[] keyValues) where TEntity : class
        //{
        //    var context = set.GetService<DbContext>();

        //    var entityType = context.Model.FindEntityType(typeof(TEntity));
        //    var key = entityType.FindPrimaryKey();

        //    var entries = context.ChangeTracker.Entries<TEntity>();

        //    var i = 0;
        //    foreach (var property in key.Properties)
        //    {
        //        var i1 = i;
        //        entries = entries.Where(e => e.Property(property.Name).CurrentValue == keyValues[i1]);
        //        i++;
        //    }

        //    var entry = entries.FirstOrDefault();
        //    if (entry != null)
        //    {
        //        // Return the local object if it exists.
        //        return entry.Entity;
        //    }

        //    var parameter = Expression.Parameter(typeof(TEntity), "x");
        //    var query = set.AsQueryable();
        //    i = 0;
        //    foreach (var property in key.Properties)
        //    {
        //        var i1 = i;
        //        query = query.Where((Expression<Func<TEntity, bool>>)
        //         Expression.Lambda(
        //             Expression.Equal(
        //                 Expression.Property(parameter, property.Name),
        //                 Expression.Constant(keyValues[i1])),
        //             parameter));
        //        i++;
        //    }

        //    // Look in the database
        //    return query.FirstOrDefault();
        //}

        //private static readonly MethodInfo SetMethod = typeof(DbContext).GetTypeInfo().GetDeclaredMethod("Set");

        //public static object Find(this DbContext context, Type entityType, params object[] keyValues)
        //{
        //    dynamic set = SetMethod.MakeGenericMethod(entityType).Invoke(context, null);
        //    var entity = Find(set, keyValues);
        //    return entity;
        //}

        public static object[] GetEntityKey<T>(this DbContext context, T entity) where T : class
        {
            var state = context.Entry(entity);
            var metadata = state.Metadata;
            var key = metadata.FindPrimaryKey();
            var props = key.Properties.ToArray();

            return props.Select(x => x.GetGetter().GetClrValue(entity)).ToArray();
        }

        public static TEntity Reload<TEntity>(this DbContext context, TEntity entity) where TEntity : class
        {
            context.Entry(entity).Reload();

            return entity;
        }

        public static TEntity Reload<TEntity>(this EntityEntry<TEntity> entry) where TEntity : class
        {
            if (entry.State == EntityState.Detached)
            {
                return entry.Entity;
            }

            var context = entry.Context;
            var entity = entry.Entity;
            var keyValues = context.GetEntityKey(entity);

            entry.State = EntityState.Detached;

            var newEntity = context.Set<TEntity>().Find(keyValues);
            var newEntry = context.Entry(newEntity);

            foreach (var prop in newEntry.Metadata.GetProperties())
            {
                prop.GetSetter().SetClrValue(entity, prop.GetGetter().GetClrValue(newEntity));
            }

            newEntry.State = EntityState.Detached;
            entry.State = EntityState.Unchanged;

            return entry.Entity;
        }
    }
}
