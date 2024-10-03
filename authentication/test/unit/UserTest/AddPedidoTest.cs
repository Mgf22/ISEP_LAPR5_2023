using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using RobDroneGO.Domain.Pedidos;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Users;


    [TestClass]
    public class PedidoServiceTests
    {
        [TestMethod]
        public async Task AddAsync_ValidInput_ReturnsPedidoDto()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var repoMock = new Mock<IPedidoRepository>();

            var pedidoService = new PedidoService(unitOfWorkMock.Object, repoMock.Object);


                string name = "Gabriel Silva";
                string email = "1210808@isep.ipp.pt";
                string phoneNumber = "+351938720202";
                string nif = "243369022";
                string password = "Teste123456!";
            
            CreatingPedidoDto dto = new CreatingPedidoDto(name,  email, phoneNumber, nif, password);

            // Act
            var result = await pedidoService.AddAsync(dto);

            // Assert
            Assert.IsNotNull(result);
            // Add more specific assertions based on your implementation and expected behavior
        }

        [TestMethod]
        [ExpectedException(typeof(BadHttpRequestException))]
        public async Task AddAsync_InvalidInput_ThrowsBadHttpRequestException()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            var repoMock = new Mock<IPedidoRepository>();

             var pedidoService = new PedidoService(unitOfWorkMock.Object, repoMock.Object);


                string name = "Gabriel Silva";
                string email = "1210808@isep.ipp.pt";
                string phoneNumber = "+351938720202";
                string nif = "24336902@";
                string password = "Teste123456!";
            
            CreatingPedidoDto dto = new CreatingPedidoDto(name,  email, phoneNumber, nif, password);

            // Act
            var result = await pedidoService.AddAsync(dto);

        // Add more test methods for other scenarios (e.g., GetAllAsync, GetByIdAsync, etc.)
    }   }
