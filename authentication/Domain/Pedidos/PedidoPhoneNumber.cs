using RobDroneGO.Domain.Shared;
using System.Text.RegularExpressions;

namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoPhoneNumber : IValueObject
    {
        public string PhoneNumber { get; private set; } 

        public PedidoPhoneNumber(string value)
        {
            if (!Regex.IsMatch(value,"\\+3519[1236][0-9]{7}")){
                throw new BusinessRuleValidationException("Numero tem de começar com +351 e 9 digitos a começar por 9 (Exemplo: +351912345678)");
            }
            PhoneNumber = value;
        }

        public PedidoPhoneNumber(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString(){
            return PhoneNumber;
        }
    }
}