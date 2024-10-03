using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Roles;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;


namespace RobDroneGO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _service;

        public RolesController(IRoleService service)
        {
            _service = service;
        }

        // GET: api/Roles/getAllRoles
        //[Authorize(Roles = "GestorCampus")]
        [HttpGet("getAllRoles")]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Roles/getRole/5
        [HttpGet("getRoleById/{id}")]
        public async Task<ActionResult<RoleDto>> GetGetById(int id)
        {
            try{
                var del = await _service.GetByIdAsync(new RoleId(id));

                if (del == null)
                {
                    return NotFound();
                }

                return del;
            }catch(BadHttpRequestException ex){
                return BadRequest(new {Message = ex.Message});
            }
            
        }

        // POST: api/Roles/criarRole
        [HttpPost("criarRole")]
        public async Task<ActionResult<RoleDto>> Create(CreatingRoleDto dto)
        {
            var role = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = role.Id }, role);
        }

        /*
        // PUT: api/Roles/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RoleDto>> Update(int id, RoleDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var role = await _service.UpdateAsync(dto);
                
                if (role == null)
                {
                    return NotFound();
                }
                return Ok(role);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Roles/5
        /*[HttpDelete("{id}")]
        public async Task<ActionResult<RoleDto>> SoftDelete(int id)
        {
            var role = await _service.InactivateAsync(new RoleId(id));

            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }
        
        // DELETE: api/Roles/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<RoleDto>> HardDelete(int id)
        {
            try
            {
                var role = await _service.DeleteAsync(new RoleId(id));

                if (role == null)
                {
                    return NotFound();
                }

                return Ok(role);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }*/
    }
}