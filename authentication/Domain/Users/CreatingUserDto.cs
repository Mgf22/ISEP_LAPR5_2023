

using System.Text.Json.Serialization;

namespace RobDroneGO.Domain.Users
{
    public class CreatingUserDto
    {
        public string Name {get; set; }
       
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string NIF { get; set; }

        public string Password { get; set; }

        public int RoleId { get; set; }

        public CreatingUserDto()
        {
        }


        
        [JsonConstructor]
        public CreatingUserDto(string name, string email, string phoneNumber, string nif, string password, int roleId)
        {
            this.Name = name;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.NIF = nif;
            this.Password = password;
            this.RoleId = roleId;
        }
    }
}