using Org.BouncyCastle.Crypto.Modes;
using RobDroneGO.Domain.Roles;

namespace RobDroneGO.Domain.Pedidos
{
    public class CreatingPedidoDto
    {
        public string Name {get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string NIF { get; set; }

        public string Password { get; set; }


        public CreatingPedidoDto(string name, string email, string phoneNumber, string nif, string password)
        {
            this.Name = name;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.NIF = nif;
            this.Password = password;
        }
    }
}