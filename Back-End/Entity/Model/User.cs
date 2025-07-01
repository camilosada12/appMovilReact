using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Annotations;
using Microsoft.Identity.Client;

namespace Entity.Model
{
    public class User : BaseModel // uno 
    {
        public string? username { get; set; } 

        public string? email { get; set; } 
        public string? password { get; set; }
        //public DateTime createddate { get; set; }
        public bool? active { get; set; }
        public int? personid { get; set; }

        [ForeignInclude("firstname", "lastname")]
        public Person? person { get; set; }

        public List<RolUser>? Roles { get; set; } 

    }

}
