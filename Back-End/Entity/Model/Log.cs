using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model
{
    public class Log : BaseModel
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Message { get; set; }
        public string Level { get; set; }
        public string Source { get; set; }
        public string? StackTrace { get; set; }
        public string? UserName { get; set; }

    }
}
