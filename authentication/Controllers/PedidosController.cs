using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Pedidos;
using Microsoft.AspNetCore.Http;
using RobDroneGO.Domain.Users;
using Microsoft.Extensions.WebEncoders.Testing;


namespace RobDroneGO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly IPedidoService _service;
        private readonly IUserService _serviceU;

        public PedidosController(IPedidoService service,UserService serviceU)
        {
            _service = service;
            _serviceU = serviceU;
        }

        // GET: api/Pedidos
        [HttpGet("getAllPedidos")]
        public async Task<ActionResult<IEnumerable<PedidoDto>>> GetAllPedidos()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Pedidos
        [HttpGet("getAllPedidosPendentes")]
        public async Task<ActionResult<IEnumerable<PedidoDto>>> GetAllPedidosPendentes()
        {
            return await _service.GetAllPendentesAsync();
        }
        

        // GET: api/Pedidos?idNumber=idNumber
        [HttpGet("getPedidoById/{id}")]
        public async Task<ActionResult<PedidoDto>> GetGetById(int id)
        {
            try{
                var pedido = await _service.GetByIdAsync(new PedidoId(id));

                if (pedido == null)
                {
                    return NotFound();
                }

                return pedido;
            }catch(BadHttpRequestException ex){
                return BadRequest(new {Message = ex.Message});
            }
            
        }

        // POST: api/Pedidos
        [HttpPost("criarPedido")]
        public async Task<ActionResult<PedidoDto>> Create(CreatingPedidoDto dto)
        {
            var pedido = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = pedido.Id }, pedido);
        }

        
        // PUT: api/Pedidos/5
        /*[HttpPut("{id}")]
        public async Task<ActionResult<PedidoDto>> Update(int id, PedidoDto dto)
        {
            if (id != dto.IdNumber)
            {
                return BadRequest();
            }

            try
            {
                var pedido = await _service.UpdateAsync(dto);
                
                if (pedido == null)
                {
                    return NotFound();
                }
                return Ok(pedido);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
*/
        // Inactivate: api/Pedidos/5
        [HttpPatch("aprovarPedido/{id}")]
        public async Task<ActionResult<PedidoDto>> AprovarPedido(int id)
        {
            var pedido = await _service.AprovarPedido(new PedidoId(id));

            if (pedido == null)
            {
                return NotFound();
            }

            var dto = new CreatingUserDto(pedido.Name,pedido.Email,pedido.PhoneNumber,pedido.NIF,pedido.Password,5);

            var user = await _serviceU.AddUtenteAsync(dto);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(pedido);
        }

        [HttpPatch("recusarPedido/{id}")]
        public async Task<ActionResult<PedidoDto>> RecusarPedido(int id)
        {
            var pedido = await _service.RecusarPedido(new PedidoId(id));

            if (pedido == null)
            {
                return NotFound();
            }

            return Ok(pedido);
        }
        /*
        // DELETE: api/Pedidos/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<PedidoDto>> HardDelete(int id)
        {
            try
            {
                var pedido = await _service.DeleteAsync(new PedidoIdNumber(id));

                if (pedido == null)
                {
                    return NotFound();
                }

                return Ok(pedido);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }*/
    }
}