using RobDroneGO.Domain.Shared;
//
namespace RobDroneGO.Domain.Users
{
    public class UserName : IValueObject
    {
        public string Name { get; private set; } 

        public UserName(string value)
        {
            Name = value;
        }

        public UserName(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString(){
            return Name;
        }

        public void alterarNome (string name){
            this.Name = name;
        }
    }
}