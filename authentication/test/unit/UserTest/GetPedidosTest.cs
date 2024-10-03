using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using RobDroneGO.Domain.Pedidos;
using RobDroneGO.Domain.Shared;

    [TestClass]
    public class GetPedidosTests
    {
        [TestMethod]
        public async Task GetAllAsync_ReturnsListOfPedidoDto()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var repoMock = new Mock<IPedidoRepository>();

            var pedidoList = new List<Pedido>
            {
                new Pedido(new PedidoId(1).Id, "Mateus Lindo", "1210821@isep.ipp.pt", "+351938202993", "243092922", "Teste123456!"),
                new Pedido(new PedidoId(2).Id, "João Mafarrico", "1210817@isep.ipp.pt", "+351938209202", "243092933", "Teste123456@")
            };

            repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(pedidoList);

            var pedidoService = new PedidoService(unitOfWorkMock.Object, repoMock.Object);

            // Act
            var result = await pedidoService.GetAllAsync();

            // Assert
            repoMock.Verify(r => r.GetAllAsync(), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<PedidoDto>));
            Assert.AreEqual(pedidoList.Count, result.Count);
            // Add more specific assertions based on your business logic and expected results
        }

        [TestMethod]
        public async Task GetAllPendentesAsync_ReturnsListOfPedidoDto()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var repoMock = new Mock<IPedidoRepository>();

            var pedidoList = new List<Pedido>
            {
                new Pedido(new PedidoId(1).Id, "Mateus Lindo", "1210821@isep.ipp.pt", "+351938202993", "243092922", "Teste123456!"),
                new Pedido(new PedidoId(2).Id, "João Mafarrico", "1210817@isep.ipp.pt", "+351938209202", "243092933", "Teste123456@")
            };

            Estado estadoPendente = Estado.Pendente;

            repoMock.Setup(r => r.GetAllPendentesAsync(estadoPendente)).ReturnsAsync(pedidoList);

            var pedidoService = new PedidoService(unitOfWorkMock.Object, repoMock.Object);

            // Act
            var result = await pedidoService.GetAllPendentesAsync();

            // Assert
            repoMock.Verify(r => r.GetAllPendentesAsync(estadoPendente), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<PedidoDto>));
            Assert.AreEqual(pedidoList.Count, result.Count);
        }
    }
