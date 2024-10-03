using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
//
namespace RobDroneGO.Domain.Users{
    public interface IUserService{
        Task<List<UserDto>> GetAllAsync();
        Task<UserDto> GetByIdAsync(int id);
        Task<UserDto> GetByEmailAsync(string email);
        Task<UserDto> AddUserAsync(CreatingUserDto dto);
        Task<UserDto> AddUtenteAsync(CreatingUserDto dto);
        //Task<UserDto> InactivateAsync(UserId id);
        Task<UserDto> UpdateAsync(string email,UpdateUserDto dto);
        Task<UserDto> DeleteAsync(string email);
        Task<UserDto> Login(UserEmail email,UserPassword password);
    }
}