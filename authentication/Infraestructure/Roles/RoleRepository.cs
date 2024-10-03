using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleId>,IRoleRepository
    {
        private readonly RobDroneGODbContext context;
        public RoleRepository(RobDroneGODbContext context):base(context.Roles)
        {
           this.context = context;
        }

        public async Task<int> CountRoles(){
            return await this.context.Roles.CountAsync();
        }
    }
}