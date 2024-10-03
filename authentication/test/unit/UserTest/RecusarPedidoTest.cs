using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using RobDroneGO.Domain.Pedidos;
using RobDroneGO.Domain.Shared;

    [TestClass]
    public class RecusarPedidoTests
    {
        [TestMethod]
        public async Task RecusarPedido_ValidId_RefusesPedido()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var repoMock = new Mock<IPedidoRepository>();

            var pedidoId = new PedidoId(1); // replace Guid.NewGuid() with a valid PedidoId value

            var pedido = new Pedido(pedidoId.Id, "Mateus Lindo", "1210821@isep.ipp.pt", "+35123456789", "243099055", "Teste123456!");
            pedido.RecusarPedido();

            repoMock.Setup(r => r.GetByIdAsync(It.IsAny<PedidoId>())).ReturnsAsync(pedido);

            var pedidoService = new PedidoService(unitOfWorkMock.Object, repoMock.Object);

            // Act
            await pedidoService.RecusarPedido(pedidoId);

            // Assert
            repoMock.Verify(r => r.GetByIdAsync(pedidoId), Times.Once);
            repoMock.Verify(r => r.Equals(pedido), Times.Once);
            unitOfWorkMock.Verify(u => u.CommitAsync(), Times.Once);

            Assert.AreEqual(Estado.Recusado, pedido.GetEstado());
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public async Task RecusarPedido_InvalidId_ThrowsBusinessRuleValidationException()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var repoMock = new Mock<IPedidoRepository>();

            var pedidoId = new PedidoId(1);

            repoMock.Setup(r => r.GetByIdAsync(It.IsAny<PedidoId>())).ReturnsAsync((Pedido)null);

            var pedidoService = new PedidoService(unitOfWorkMock.Object, repoMock.Object);

            // Act & Assert
            await pedidoService.RecusarPedido(pedidoId);

            // Verify that GetByIdAsync was called once
            repoMock.Verify(r => r.GetByIdAsync(pedidoId), Times.Once);
        }
    }