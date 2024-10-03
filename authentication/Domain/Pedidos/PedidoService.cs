using System.Threading.Tasks;
using System.Collections.Generic;
using RobDroneGO.Domain.Shared;
using System;
using Microsoft.AspNetCore.Http;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Users;
using MySql.Data.MySqlClient;
using Microsoft.EntityFrameworkCore;



namespace RobDroneGO.Domain.Pedidos
{
    public class PedidoService : IPedidoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPedidoRepository _repo;

        public PedidoService(IUnitOfWork unitOfWork, IPedidoRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<PedidoDto> AddAsync(CreatingPedidoDto dto)
        {
            try
            {
                var pedido = new Pedido(await GenerateId(), dto.Name, dto.Email, dto.PhoneNumber, dto.NIF, dto.Password);
                await this._repo.AddAsync(pedido);
                await this._unitOfWork.CommitAsync();

                return new PedidoDto(pedido.Id.toInt(), pedido.Name.toString(), pedido.Email.toString(), pedido.PhoneNumber.toString(), pedido.NIF.toString(), pedido.Password.toString(), pedido.GetEstado().ToString(), pedido.GetDataPedido().ToString(), pedido.GetDataMudancaEstado().ToString());

            }
            catch (DbUpdateException ex) when (ex.InnerException is MySqlException mysqlEx && mysqlEx.Number == (int)MySqlErrorCode.DuplicateKeyEntry)
            {
                if (mysqlEx.Message.Contains("Pedidos.IX_Pedidos_PhoneNumber"))
                {
                    // Caso ocorra um erro de chave duplicada (número de telefone já existe), capture e retorne uma mensagem personalizada
                    throw new DbUpdateException("Este número de telefone já se encontra em uso! Tente outro!");
                }
                else if (mysqlEx.Message.Contains("Pedidos.IX_Pedidos_Email"))
                {
                    // Caso ocorra um erro de chave duplicada (email já existe), capture e retorne uma mensagem personalizada
                    throw new DbUpdateException("Este email já se encontra em uso! Tente outro!");
                }
                else
                {
                    // Trate outros erros de chave duplicada aqui se necessário
                    throw new DbUpdateException("Erro de chave duplicada ao adicionar o pedido.");
                }
            }
            catch (BusinessRuleValidationException ex)
            {
                throw new BadHttpRequestException(ex.Message);
            }


        }

        /*public async Task<PedidoDto> UpdateAsync(PedidoDto dto)
        {
            var pedido = await this._repo.GetByNumberIdAsync(new PedidoIdNumber(dto.IdNumber)); 

            if (pedido == null)
                return null;   

            // change all fields
            /*if(dto.Description != null){
                pedido.ChangeDescription(dto.Description);
            }

            await this._unitOfWork.CommitAsync();

            return new PedidoDto(pedido.Id.AsGuid(), pedido.IdNumber.toInt(),pedido.Name.toString(), pedido.Description.toString(), pedido.getActive());
        }*/

        public async Task<List<PedidoDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<PedidoDto> listDTO = list.ConvertAll<PedidoDto>(pedido => new PedidoDto(pedido.Id.toInt(), pedido.Name.toString(), pedido.Email.toString(), pedido.PhoneNumber.toString(), pedido.NIF.toString(), pedido.Password.toString(), pedido.GetEstado().ToString(), pedido.GetDataPedido().ToString(), pedido.GetDataMudancaEstado().ToString()));

            return listDTO;
        }

        public async Task<List<PedidoDto>> GetAllPendentesAsync()
        {
            Estado estado = Estado.Pendente;
            var list = await this._repo.GetAllPendentesAsync(estado);

            List<PedidoDto> listDTO = list.ConvertAll<PedidoDto>(pedido => new PedidoDto(pedido.Id.toInt(), pedido.Name.toString(), pedido.Email.toString(), pedido.PhoneNumber.toString(), pedido.NIF.toString(), pedido.Password.toString(), pedido.GetEstado().ToString(), pedido.GetDataPedido().ToString(), pedido.GetDataMudancaEstado().ToString()));

            return listDTO;
        }

        public async Task<PedidoDto> GetByIdAsync(PedidoId id)
        {
            var pedido = await this._repo.GetByIdAsync(id);

            if (pedido == null)
                return null;

            return new PedidoDto(pedido.Id.toInt(), pedido.Name.toString(), pedido.Email.toString(), pedido.PhoneNumber.toString(), pedido.NIF.toString(), pedido.Password.toString(), pedido.GetEstado().ToString(), pedido.GetDataPedido().ToString(), pedido.GetDataMudancaEstado().ToString());
        }

        public async Task<PedidoDto> AprovarPedido(PedidoId id)
        {
            var pedido = await this._repo.GetByIdAsync(id);

            bool verificacao = !pedido.GetEstado().Equals(Estado.Pendente);

            if (pedido == null || !pedido.GetEstado().Equals(Estado.Pendente))
            {
                throw new BusinessRuleValidationException("Pedido não se encontra Pendente");
            }


            pedido.AprovarPedido();

            await this._unitOfWork.CommitAsync();

            return new PedidoDto(pedido.Id.toInt(), pedido.Name.toString(), pedido.Email.toString(), pedido.PhoneNumber.toString(), pedido.NIF.toString(), pedido.Password.toString(), pedido.GetEstado().ToString(), pedido.GetDataPedido().ToString(), pedido.GetDataMudancaEstado().ToString());
        }

        public async Task<PedidoDto> RecusarPedido(PedidoId id)
        {
            var pedido = await this._repo.GetByIdAsync(id);

            if (pedido == null || !pedido.GetEstado().Equals(Estado.Pendente))
            {
                throw new BusinessRuleValidationException("Pedido não se encontra Pendente");
            }

            pedido.RecusarPedido();

            await this._unitOfWork.CommitAsync();

            return new PedidoDto(pedido.Id.toInt(), pedido.Name.toString(), pedido.Email.toString(), pedido.PhoneNumber.toString(), pedido.NIF.toString(), pedido.Password.toString(), pedido.GetEstado().ToString(), pedido.GetDataPedido().ToString(), pedido.GetDataMudancaEstado().ToString());
        }
        /*
        public async Task<PedidoDto> DeleteAsync(PedidoIdNumber id)
        {
            var pedido = await this._repo.GetByNumberIdAsync(id); 

            if (pedido == null)
                return null;   

            if (pedido.getActive())
                throw new BusinessRuleValidationException("It is not possible to delete an active pedido.");
            
            this._repo.Remove(pedido);
            await this._unitOfWork.CommitAsync();

            return new PedidoDto(pedido.Id.AsGuid(),pedido.IdNumber.toInt(), pedido.Name.toString(), pedido.Description.toString(), pedido.getActive());
        }
*/
        private async Task<int> GenerateId()
        {
            return await _repo.CountPedidos() + 1;
        }
    }
}