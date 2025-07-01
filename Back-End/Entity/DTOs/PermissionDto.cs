using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.DTOs
{
    public class PermissionDto : BaseDto
    {   
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
