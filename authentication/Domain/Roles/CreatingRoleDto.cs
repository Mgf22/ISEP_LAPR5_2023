namespace RobDroneGO.Domain.Roles
{
    public class CreatingRoleDto
    {
        public string Name { get; set; }



        public CreatingRoleDto(string name)
        {
            this.Name = name;
        }
    }
}