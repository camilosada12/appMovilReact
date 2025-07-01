using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model
{
    public class Form : BaseModel
    {

        public string name { get; set; }
        public string description { get; set; }
        //public DateTime? createddate { get; set; } = DateTime.UtcNow;

        public bool active { get; set; }

        public ICollection<FormModule> FormModules { get; set; } 
        public ICollection<RolFormPermission> RolFormPermission { get; set; }

    }
}
