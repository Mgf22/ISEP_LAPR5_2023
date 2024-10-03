using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RobDroneGO.Domain.Pedidos;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Shared;
using RobDroneGO.Domain.Users;

namespace UserTest.Tests
{
    [TestClass]
    public class UserTest
    {
        [TestMethod]
        [DataRow("123124125!")]
        [DataRow("123124125@")]
        [DataRow("123124125^")]
        public void CheckInvalidNif(string value){
            Assert.ThrowsException<BusinessRuleValidationException>(() => new UserNIF(value));
        }
        
        
        [TestMethod]
        [DataRow("123124125!")]
        [DataRow("123124125@")]
        [DataRow("123124125^")]
        public void CheckInvalidNumber(string value){
            Assert.ThrowsException<BusinessRuleValidationException>(() => new UserNIF(value));
        }
        
        [TestMethod]
        [DataRow("243069022")]
        public void ValidNif(string value){
            UserNIF var = new(value);
            
            Assert.AreEqual(value, var.NIF.ToString());
        }
        
         [TestMethod]
        [DataRow("936638056")]
        public void ValidNumber(string value){
            UserPhoneNumber var = new(value);
            
            Assert.AreEqual(value, var.PhoneNumber.ToString());
        }
    }
}
