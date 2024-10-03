using System.Text.RegularExpressions;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoNIF : IValueObject
    {
        public string NIF { get; private set; }

        public PedidoNIF(string value)
        {
            if (!Regex.IsMatch(value, @"^(\d{9})?$"))
            {
                throw new BusinessRuleValidationException("Nif tem de ter 9 digitos");
            }
            NIF = value;
        }

        public PedidoNIF() { }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return CC;
        }*/

        public string toString()
        {
            return NIF;
        }
    }
}