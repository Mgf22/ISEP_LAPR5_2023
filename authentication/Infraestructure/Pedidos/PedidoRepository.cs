using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RobDroneGO.Domain.Pedidos;
using RobDroneGO.Infrastructure.Shared;

namespace RobDroneGO.Infrastructure.Pedidos
{
    public class PedidoRepository : BaseRepository<Pedido, PedidoId>,IPedidoRepository
    {
        private readonly RobDroneGODbContext context;
        public PedidoRepository(RobDroneGODbContext context):base(context.Pedidos)
        {
           this.context = context;
        }

        public async Task<int> CountPedidos(){
            return await this.context.Pedidos.CountAsync();
        }

        public async Task<List<Pedido>> GetAllPendentesAsync(Estado estado){
            return await this.context.Pedidos.Where(x=> estado.Equals(x.Estado)).ToListAsync();
        }
    }

}