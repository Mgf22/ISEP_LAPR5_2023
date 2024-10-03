using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using RobDroneGO.Domain.Pedidos;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Users;
using RobDroneGO.Infrastructure;


[TestClass]
    public class UserServiceTests
    {
        [TestMethod]
        public async Task AddUserAsync_WithValidRole_ShouldReturnUserDto()
        {
            // Arrange
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var mockUserRepository = new Mock<IUserRepository>();
            var mockRoleRepository = new Mock<IRoleRepository>();
            var mockDbContext = new Mock<RobDroneGODbContext>();
            var userService = new UserService(mockUnitOfWork.Object, mockUserRepository.Object, mockRoleRepository.Object, mockDbContext.Object);

            var dto = new CreatingUserDto
            {
                RoleId = 1,
                Name = "John Doe",
                Email = "1210808@isep.ipp.pt",
                PhoneNumber = "+351938727436",
                Password = "Teste123456!"
            };

            var mockRole = new Role(new RoleId(1).Id, "1");
            mockRoleRepository.Setup(repo => repo.GetByIdAsync(It.IsAny<RoleId>())).ReturnsAsync(mockRole);

            // Act
            var result = await userService.AddUserAsync(dto);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(dto.Name, result.Name);
            Assert.AreEqual(dto.Email, result.Email);
            Assert.AreEqual(dto.PhoneNumber, result.PhoneNumber);
        }
    }