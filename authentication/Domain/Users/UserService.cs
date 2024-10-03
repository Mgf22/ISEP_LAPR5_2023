using System.Threading.Tasks;
using System.Collections.Generic;
using RobDroneGO.Domain.Shared;
using Microsoft.AspNetCore.Http;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Infrastructure;
using System.Linq;



namespace RobDroneGO.Domain.Users
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;

        private readonly IRoleRepository _repoR;
        
        private readonly RobDroneGODbContext _dbContext;


        public UserService(IUnitOfWork unitOfWork, IUserRepository repo, IRoleRepository repoR, RobDroneGODbContext dbContext)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoR = repoR;
            _dbContext = dbContext;

        }

        public async Task<UserDto> AddUserAsync(CreatingUserDto dto)
        {
            try
            {
                var role = await this._repoR.GetByIdAsync(new RoleId(dto.RoleId));

                if (role == null)
                    return null;
                var user = new User(await GenerateId(), dto.Name, dto.Email, dto.PhoneNumber, "",dto.Password, role.Id);
                await this._repo.AddAsync(user);
                await this._unitOfWork.CommitAsync();

                return new UserDto(user.Id.Id,user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(),"",user.Password.toString(),user.RoleId.toInt());

            }
            catch (BusinessRuleValidationException ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }
        }

        public async Task<UserDto> AddUtenteAsync(CreatingUserDto dto)
        {
            try
            {
                var role = await this._repoR.GetByIdAsync(new RoleId(dto.RoleId));

                if (role == null)
                    return null;
                var utente = new User(await GenerateId(), dto.Name, dto.Email, dto.PhoneNumber, dto.NIF,dto.Password, role.Id);
                await this._repo.AddAsync(utente);
                await this._unitOfWork.CommitAsync();

            return new UserDto(utente.Id.toInt(),utente.Name.toString(),utente.Email.toString(), utente.PhoneNumber.toString(), utente.NIF.toString(), utente.Password.toString(), 5);

            }
            catch (BusinessRuleValidationException ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }
        }

        public async Task<UserDto> UpdateAsync(string email,UpdateUserDto dto)
        {
            var user = await this._repo.GetByEmailAsync(new UserEmail(email)); 

            if (user == null)
                return null;   

            if (dto.Name != null){
                user.AlterarNome(dto.Name);
            }

            if (dto.PhoneNumber != null){
                user.AlterarPhoneNumber(dto.PhoneNumber);
            }

            if (dto.NIF != null){
                user.AlterarNif(dto.NIF);
            }

            if (dto.Password != null){
                user.AlterarPassword(dto.Password);
            }

            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.NIF.toString(), user.Password.toString(), user.RoleId.toInt());
}

        public async Task<List<UserDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<UserDto> listDTO = list.ConvertAll<UserDto>(user => new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.NIF.toString(),user.Password.toString(), user.RoleId.toInt()));

            return listDTO;
        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            var user = await this._repo.GetByIdAsync(new UserId(id));

            if (user == null)
                return null;

            return new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.NIF.toString(), user.Password.toString(), user.RoleId.toInt());
        }

        public async Task<UserDto> GetByEmailAsync(string email)
        {
            var user = await this._repo.GetByEmailAsync(new UserEmail(email));

            if (user == null)
                return null;

            return new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.NIF.toString(), user.Password.toString(), user.RoleId.toInt());
        }
        

            public async Task<UserDto> DeleteAsync(string email)
            {
                var user = await this._repo.GetByEmailAsync(new UserEmail(email)); 

                if (user == null)
                    return null;   

                this._repo.Remove(user);
                await this._unitOfWork.CommitAsync();

                return new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.NIF.toString(),user.Password.toString(),  user.RoleId.toInt());
            }
    
        private async Task<int> GenerateId()
        {
            return await _repo.GetMaxUserId() + 1;
        }


        public async Task<UserDto> Login(UserEmail email, UserPassword password)
        {
            var user = await this._repo.Login(email,password);

            if (user == null)
                return null;

            return new UserDto(user.Id.toInt(),user.Name.toString(),user.Email.toString(), user.PhoneNumber.toString(), user.NIF.toString(), user.Password.toString(), user.RoleId.toInt());
        }



    }
}
