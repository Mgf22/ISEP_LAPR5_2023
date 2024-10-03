using RobDroneGO.Domain.Shared;
using System.Text.RegularExpressions;

namespace RobDroneGO.Domain.Users
{
    public class UserPhoneNumber : IValueObject
    {
        public string PhoneNumber { get; private set; } 

        public UserPhoneNumber(string value)
        {
           if (!Regex.IsMatch(value,"\\+3519[1236][0-9]{7}")){
                throw new BusinessRuleValidationException("Numero tem de começar com +351 e 9 digitos a começar por 9 (Exemplo: +351912345678)");
            }
            PhoneNumber = value;
        }

        public UserPhoneNumber(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString(){
            return PhoneNumber;
        }

        public void alterarPhoneNumber (string phoneNumber){
            /*if (!Regex.IsMatch(phoneNumber,@"^\+3519\d{9}$")){
                throw new BusinessRuleValidationException("Numero tem de começar com +351 e 9 digitos a começar por 9 (Exemplo: +351912345678)");
            }*/
            this.PhoneNumber = phoneNumber;
        }
    }
}