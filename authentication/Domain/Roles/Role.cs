using System;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Roles;
namespace RobDroneGO.Domain.Roles
{
    public class Role : Entity<RoleId>, IAggregateRoot
    {
        public RoleName Name { get; private set;}

        private Role()
        {
        }

        public Role( int id, string name)
        {
            this.Id = new RoleId(id);
            this.Name = new RoleName(name);
        }
    }
}