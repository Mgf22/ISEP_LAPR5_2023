using System;
using RobDroneGO.Domain.Shared;
//
namespace RobDroneGO.Domain.Users
{
    public class UserId : EntityId
    {

        public int Id { get; private set; } 

        public UserId(int value): base(value)
        {
            Id = value;
        }

        public UserId(string value) : base(ParseStringValue(value))
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

        //public UserIdNumber(){}

    /*
        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return IdNumber;
        }
*/
        public int toInt(){
            return Id;
        }

        

        protected override object createFromString(string text)
        {
            if (int.TryParse(text, out int parsedValue))
            {
                return new UserId(parsedValue);
            }
            else
            {
                throw new ArgumentException("Invalid string format for UserId");
            }
        }

        public override string AsString()
        {
            return Id.ToString();
        }
    }
}
