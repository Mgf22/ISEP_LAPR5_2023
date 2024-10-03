using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Shared;
using System;
namespace RobDroneGO.Domain.Pedidos
{
    public class Pedido : Entity<PedidoId>, IAggregateRoot
    {

        public PedidoUserName Name { get; private set; }

        public PedidoEmail Email {get; private set;}

        public PedidoPhoneNumber PhoneNumber {get; private set;}

        public PedidoNIF NIF { get ; private set ;}

        public PedidoPassword Password { get ; private set; }

        public Estado Estado { get; private set;}

        public DateTime DataPedido { get; private set;}

        public DateTime DataMudancaEstado {get; private set; }



        public Pedido()
        {
        }

        public Pedido(int id,string name,string email, string phoneNumber, string nif,string password)
        {

            this.Id = new PedidoId(id);
            this.Name = new PedidoUserName(name);
            this.Email = new PedidoEmail(email);
            this.PhoneNumber = new PedidoPhoneNumber(phoneNumber);
            this.NIF = new PedidoNIF(nif);
            this.Password = new PedidoPassword(password);
            this.Estado = Estado.Pendente;
            this.DataPedido = DateTime.Now;
            this.DataMudancaEstado = DateTime.Now;
        }
        public void AprovarPedido()
        {
            this.Estado = Estado.Aceite;
            this.DataMudancaEstado = DateTime.Now;
        }

        public void RecusarPedido()
        {
            this.Estado = Estado.Recusado;
            this.DataMudancaEstado = DateTime.Now;
        }

        public Estado GetEstado(){
            return Estado;
        }

        public DateTime GetDataPedido(){
            return DataPedido;
        }

        public DateTime GetDataMudancaEstado(){
            return DataMudancaEstado;
        }
    }
}
