using System.Collections.Generic;
using System.Threading.Tasks;

namespace RobDroneGO.Domain.Roles{
    public interface IRoleService{
        Task<List<RoleDto>> GetAllAsync();
        Task<RoleDto> GetByIdAsync(RoleId id);
        Task<RoleDto> AddAsync(CreatingRoleDto dto);
        //Task<RoleDto> InactivateAsync(RoleId id);
        Task<RoleDto> UpdateAsync(RoleDto dto);
        //Task<RoleDto> DeleteAsync(RoleId id);
    }
}