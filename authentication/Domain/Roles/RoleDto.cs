using System;
namespace RobDroneGO.Domain.Roles
{
    public class RoleDto
    {
        public int Id { get; private set;}
        public string Name { get; private set;}

        public RoleDto(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
    }
}