using System.Collections.Generic;
using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;


namespace RobDroneGO.Domain.Pedidos
{
    public interface IPedidoRepository:IRepository<Pedido,PedidoId>
    {
        Task<List<Pedido>> GetAllPendentesAsync(Estado estado);
        Task<int> CountPedidos();
    }
}