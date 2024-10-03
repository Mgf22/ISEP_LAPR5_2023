using System.Threading.Tasks;

namespace RobDroneGO.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}