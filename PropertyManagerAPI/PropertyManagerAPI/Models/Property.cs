using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManagerAPI.Models
{
    public class Property
    {
       
            //Primary key
            public int PropertyId { get; set; }

            //Foreign Key
            public string UserId { get; set; }

            //Property fields
            public string Text { get; set; }
            public DateTime CreatedDate { get; set; }
            public int LikedCount { get; set; }

            //Entity relationships
            public virtual ICollection<Comment> Comments { get; set; }
            public virtual Property User { get; set; }
            public virtual ICollection<Like> Likes { get; set; }

        }
    }