using System.Text.Json.Serialization;

namespace RobDroneGO.Domain.Users
{
    public class UpdateUserDto
    {

        public string Name { get; private set; }
    
        public string PhoneNumber {get; private set;}

        public string NIF { get; private set;}
        
        public string Password { get; private set; }

        [JsonConstructor]
        public UpdateUserDto( string name, string phoneNumber, string nif, string password)
        {
            this.Name = name;
            this.PhoneNumber = phoneNumber;
            this.NIF = nif;
            this.Password = password;
        }
    }
}