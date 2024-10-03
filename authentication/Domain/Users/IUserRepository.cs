using System;
using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;

//
namespace RobDroneGO.Domain.Users
{   
    public interface IUserRepository:IRepository<User,UserId>
    {
        Task<User> GetByEmailAsync(UserEmail email);
        Task<int> GetMaxUserId();
        Task<int> CountUsers();
        Task<User> Login(UserEmail email, UserPassword password);
    }
}