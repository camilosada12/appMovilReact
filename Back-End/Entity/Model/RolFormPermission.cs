using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Annotations;

namespace Entity.Model
{
    public class RolFormPermission : BaseModel
    {
        public int rolid { get; set; }
        public int formid { get; set; }
        public int permissionid { get; set; }

        [ForeignInclude("name")]
        public rol Rol { get; set; }    

        [ForeignInclude("name")]
        public Form Form { get; set; }

        [ForeignInclude("name")]
        public Permission Permission { get; set; }

    }
}
