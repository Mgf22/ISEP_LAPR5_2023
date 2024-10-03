using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoUserName : IValueObject
    {
        public string Name { get; private set; } 

        public PedidoUserName(string value)
        {
            Name = value;
        }

        public PedidoUserName(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString(){
            return Name;
        }
    }
}