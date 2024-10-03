using System;
using RobDroneGO.Domain.Shared;

namespace RobDroneGO.Domain.Roles
{
    public class RoleId : EntityId
    {

        public int Id { get; private set; }

        public RoleId(int value) : base(value)
        {
            Id = value;
        }

        public RoleId(string value) : base(ParseStringValue(value))
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
                throw new ArgumentException("Invalid string format for RoleId");
            }
        }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return IdNumber;
        }*/

        public int toInt()
        {
            return Id;
        }

        protected override object createFromString(string text)
        {
            if (int.TryParse(text, out int parsedValue))
            {
                return new RoleId(parsedValue);
            }
            else
            {
                throw new ArgumentException("Invalid string format for RoleId");
            }
        }

        public override string AsString()
        {
            return Id.ToString();
        }
    }
}