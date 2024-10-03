using RobDroneGO.Domain.Shared;
using Microsoft.Extensions.Configuration;
using System.Xml;
using System.Text.RegularExpressions;

namespace RobDroneGO.Domain.Users
{
    public class UserEmail : IValueObject
    {
        private readonly string DomainAtt;
        public string Email { get; private set; }

        public UserEmail(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public UserEmail(string email)
        {

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load("emailConfig.xml"); 
            

            XmlNode domainNode = xmlDoc.SelectSingleNode("/emailConfiguration/domainName");
        
            DomainAtt = domainNode.InnerText;

            if (!Regex.IsMatch(email,DomainAtt)){
                throw new BusinessRuleValidationException("Email tem de pertencer ao dominio @isep.ipp.pt");
            }
            
            Email = email;
        }

        public UserEmail() { }

        /*protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Email;
        }*/

        public string toString()
        {
            return Email;
        }
    }
}