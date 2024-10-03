using RobDroneGO.Domain.Shared;
using System.Text.RegularExpressions;

namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoPassword : IValueObject
    {
        public string Password { get; private set; } 

        public PedidoPassword(string value)
        {
            if (!Regex.IsMatch(value,@"^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{10,}$")){
                throw new BusinessRuleValidationException("Password deve conter no minimo 10 caracteres, no minimo 1 letra maiuscula, no minimo 1 número e no minimo 1 simbolo");
            }
            Password = value;
        }

        public PedidoPassword(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Password;
        }*/

        public string toString(){
            return Password;
        }
    }
}