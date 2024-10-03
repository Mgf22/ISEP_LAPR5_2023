using System;
using Microsoft.Net.Http.Headers;
using Org.BouncyCastle.Asn1.Misc;
using RobDroneGO.Domain.Roles;


namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoDto
    {
        public int Id { get; private set;}

        public string Name {get; private set;}

        public string Email { get; private set; }
    
        public string PhoneNumber {get; private set;}

        public string NIF { get; private set;}
        
        public string Password { get; private set; }

        public string Estado { get ; private set;}

        public string DataPedido {get; private set;}

        public string DataMudancaEstado {get; private set;}

        public PedidoDto(int id, string name, string email, string phoneNumber, string nif, string password, string estado, string dataPedido, string dataMudancaEstado)
        {
            this.Id = id;
            this.Name = name;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.NIF = nif;
            this.Password = password;
            this.Estado = estado;
            this.DataPedido = dataPedido;
            this.DataMudancaEstado = dataMudancaEstado;
        }
    }
}