using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RobDroneGO.Domain.Pedidos;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Users;

namespace RoleTest.Tests
{
    [TestClass]
    public class RoleTest
    {
        [TestMethod]
        [DataRow(7)]
        public void CheckIdRole(int value){
            RoleId var = new(value);
             Assert.AreEqual(value, var.Id);
        }
        
        [TestMethod]
        [DataRow("Utente")]
        [DataRow("Gestor de Tarefas")]
		[DataRow("Gestor de Campus")]
		[DataRow("Gestor de Frota")]
		[DataRow("Administrador")]

        public void CheckNameRole(string value){
          RoleName var = new (value);
          Assert.AreEqual(value, var.Name.ToString());
        }
    }
}