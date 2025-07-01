using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.DTOs
{
    public class FormDto : BaseDto
    {
        public string name { get; set; }
        public string description { get; set; }
        //public DateTime createddate { get; set; }
        //public bool isdeleted { get; set; }

    }
}
