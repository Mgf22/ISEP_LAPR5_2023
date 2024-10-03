using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Roles
{
    public class RoleName : IValueObject
    {
        public string Name { get; private set; }

        public RoleName(string value)
        {
            Name = value;
        }

        public RoleName() { }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Name;
        }*/

        public string toString()
        {
            return Name;
        }
    }
}