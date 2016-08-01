using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace PropertyManagerAPI.Models
{
    public class PropertyManagerUser : IdentityUser
    {
        //fields
        public string FirstName { get; set; }
        public string LastName { get; set; }

        //defining entity relationships
        public virtual ICollection<Property> Properties { get; set; }
        
    }
}