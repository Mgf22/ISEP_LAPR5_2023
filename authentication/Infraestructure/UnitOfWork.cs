using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly RobDroneGODbContext _context;

        public UnitOfWork(RobDroneGODbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}