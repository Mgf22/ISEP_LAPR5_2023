using System.Threading.Tasks;
using System.Collections.Generic;
using RobDroneGO.Domain.Shared;
using System;
using Microsoft.AspNetCore.Http;


namespace RobDroneGO.Domain.Roles
{
    public class RoleService : IRoleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRoleRepository _repo;

        public RoleService(IUnitOfWork unitOfWork, IRoleRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<RoleDto> AddAsync(CreatingRoleDto dto)
        {
            try
            {
                var role = new Role(await GenerateId(), dto.Name);
                await this._repo.AddAsync(role);
                await this._unitOfWork.CommitAsync();

                return new RoleDto(role.Id.toInt(), role.Name.toString());

            }
            catch (BusinessRuleValidationException ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }
        }

        public async Task<RoleDto> UpdateAsync(RoleDto dto)
        {
            var role = await this._repo.GetByIdAsync(new RoleId(dto.Id));

            if (role == null)
                return null;

            // change all fields
            /*if(dto.Description != null){
                role.ChangeDescription(dto.Description);
            }*/

            await this._unitOfWork.CommitAsync();

            return new RoleDto(role.Id.toInt(), role.Name.toString());
        }

        public async Task<List<RoleDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<RoleDto> listDTO = list.ConvertAll<RoleDto>(role => new RoleDto(role.Id.toInt(), role.Name.toString()));

            return listDTO;
        }

        public async Task<RoleDto> GetByIdAsync(RoleId id)
        {
            var role = await this._repo.GetByIdAsync(id);

            if (role == null)
                return null;

            return new RoleDto(role.Id.toInt(), role.Name.toString());
        }

        /*public async Task<RoleDto> InactivateAsync(RoleId id)
        {
            var role = await this._repo.GetByNumberIdAsync(id);

            if (role == null)
                return null;

            role.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new RoleDto(role.Id.toInt(), role.Name.toString());
        }*/

        /*public async Task<RoleDto> DeleteAsync(RoleId id)
        {
            var role = await this._repo.GetByNumberIdAsync(id);

            if (role == null)
                return null;

            if (role.getActive())
                throw new BusinessRuleValidationException("It is not possible to delete an active role.");

            this._repo.Remove(role);
            await this._unitOfWork.CommitAsync();

            return new RoleDto(role.Id.toInt(), role.Name.toString());
        }*/

        private async Task<int> GenerateId()
        {
            return await _repo.CountRoles() + 1;
        }
    }
}