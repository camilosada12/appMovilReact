using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model
{
    public class Person : BaseModel
    {
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string phonenumber { get; set; }
        public bool active { get; set; }
        public ICollection<User> User { get; set; }
    }
}
