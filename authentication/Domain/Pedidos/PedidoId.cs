using System;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoId : EntityId
    {
        
        public int Id { get; private set; } 

        public PedidoId(int value): base(value)
        {
            Id = value;
        }

        public PedidoId(string value) : base(ParseStringValue(value))
        {
            Id = ParseStringValue(value);
        }

        private static int ParseStringValue(string text)
        {
            if (int.TryParse(text, out int parsedValue))
            {
                return parsedValue;
            }
            else
            {
                throw new ArgumentException("Invalid string format for PedidoId");
            }
        }

        //public PedidoIdNumber(){}

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return IdNumber;
        }*/

        public int toInt(){
            return Id;
        }

        protected override object createFromString(string text)
        {
            if (int.TryParse(text, out int parsedValue))
            {
                return new PedidoId(parsedValue);
            }
            else
            {
                throw new ArgumentException("Invalid string format for PedidoId");
            }
        }

        public override string AsString()
        {
            return Id.ToString();
        }
    }
}