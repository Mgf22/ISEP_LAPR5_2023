using System.Collections.Generic;
using System.Threading.Tasks;

namespace RobDroneGO.Domain.Pedidos{
    public interface IPedidoService{
        Task<List<PedidoDto>> GetAllAsync();

        Task<List<PedidoDto>> GetAllPendentesAsync();
        Task<PedidoDto> GetByIdAsync(PedidoId id);
        Task<PedidoDto> AddAsync(CreatingPedidoDto dto);
        Task<PedidoDto> AprovarPedido(PedidoId id);
        Task<PedidoDto> RecusarPedido(PedidoId id);
        /*Task<UserDto> UpdateAsync(UserDto dto);
        Task<UserDto> DeleteAsync(UserId id);*/
    }
}