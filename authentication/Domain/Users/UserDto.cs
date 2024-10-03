
using System.Text.Json.Serialization;

namespace RobDroneGO.Domain.Users
{
    public class UserDto
    {
        public int Id { get; private set;}

        public string Name { get; private set; }

        public string Email {get; private set;}
    
        public string PhoneNumber {get; private set;}

        public string NIF { get; private set;}
        
        public string Password { get; private set; }

        public int RoleId { get;  private set; }

        [JsonConstructor]
        public UserDto( int id, string name, string email , string phoneNumber, string nif, string password, int roleId)
        {
            this.Id = id;
            this.Name = name;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.NIF = nif;
            this.Password = password;
            this.RoleId = roleId;
        }
    }
}