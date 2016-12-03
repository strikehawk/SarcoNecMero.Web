using Microsoft.AspNetCore.Mvc;
using SarcoNecMero.Web.Models.DAL;
using System;

namespace SarcoNecMero.Web.Controllers
{
    public abstract class DataController : Controller
    {
        protected UnitOfWork unitOfWork;

        protected DataController(UnitOfWork unitOfWork)
        {
            if (unitOfWork == null) throw new ArgumentNullException("unitOfWork");

            this.unitOfWork = unitOfWork;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (unitOfWork != null)
                {
                    unitOfWork.Dispose();
                    unitOfWork = null;
                }
            }

            base.Dispose(disposing);
        }
    }
}
