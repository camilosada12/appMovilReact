using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.DTOs
{
    public class RolFormPermissionDto : BaseDto
    {

        public int RolId { get; set; }  
        public int Permissionid { get; set; }
        public int FormId { get; set; }

    }
}
