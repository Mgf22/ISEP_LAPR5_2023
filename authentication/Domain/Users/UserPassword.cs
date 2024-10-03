using System.Text.RegularExpressions;
using RobDroneGO.Domain.Shared;
//
namespace RobDroneGO.Domain.Users
{
    public class UserPassword : IValueObject
    {
        public string Password { get; private set; } 

        public UserPassword(string value)
        {
            if (!Regex.IsMatch(value,@"^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{10,}$")){
                throw new BusinessRuleValidationException("Password deve conter no minimo 10 caracteres, no minimo 1 letra maiuscula, no minimo 1 número e no minimo 1 simbolo");
            }
            Password = value;
        }

        public UserPassword(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Password;
        }*/

        public string toString(){
            return Password;
        }

        public void alterarPassword(string password){
            if (!Regex.IsMatch(password,@"^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{10,}$")){
                throw new BusinessRuleValidationException("Password deve conter no minimo 10 caracteres, no minimo 1 letra maiuscula, no minimo 1 número e no minimo 1 simbolo");
            }
            this.Password = password;
        }
    }
}