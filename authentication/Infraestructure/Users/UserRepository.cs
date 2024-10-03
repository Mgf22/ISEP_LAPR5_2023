using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using RobDroneGO.Domain;
using RobDroneGO.Domain.Users;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>, IUserRepository
    {
        private readonly RobDroneGODbContext context;
        public UserRepository(RobDroneGODbContext context) : base(context.Users)
        {
            this.context = context;
        }

        public async Task<int> GetMaxUserId()
        {
            var userIds = await this.context.Users.Select(x => x.Id.Id).ToListAsync();
            var maxId = userIds.Max();
            return maxId;
        }


        public async Task<int> CountUsers()
        {
            return await this.context.Users.CountAsync();
        }

        public async Task<User> GetByEmailAsync(UserEmail email)
        {
            //estado tem de ser diferente de rejeitado
            return await this.context.Users.Where(x => email.Email.Equals(x.Email.Email)).FirstAsync();
        }

        public async Task<User> Login(UserEmail email, UserPassword password)
        {
            return await this.context.Users.Where(x => email.Email.Equals(x.Email.Email) && password.Password.Equals(x.Password.Password)).FirstAsync();
        }
    }
}