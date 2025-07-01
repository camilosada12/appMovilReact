using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Annotations;

namespace Entity.Model
{
    public class FormModule : BaseModel
    {
        public int formid { get; set; }
        public int moduleid { get; set; }

        [ForeignInclude("name")]
        public virtual Form Form { get; set; }
        [ForeignInclude("name")]
        public virtual Module Module { get; set; }

    }
}
