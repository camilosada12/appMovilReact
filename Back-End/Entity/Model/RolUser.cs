using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Annotations;

namespace Entity.Model
{
    public class RolUser : BaseModel // Mucho
    {
        public int rolid { get; set; }
        public int userid { get; set; }
        //public bool Active { get; set; }

        [ForeignInclude("name")]
        public rol? Rol { get; set; }

        [ForeignInclude("username")]
        public User? User { get; set; }
    }
}
