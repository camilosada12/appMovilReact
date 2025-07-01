using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Business.Enums
{
    /// <summary>
    /// Enum que representa los modos de eliminación para los registros.
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum DeleteMode
    {
        /// <summary>
        /// Eliminación física del registro (borrado definitivo de la base de datos).
        /// </summary>
        fisico,

        /// <summary>
        /// Eliminación lógica del registro (marcado como eliminado, sin borrar físicamente).
        /// </summary>
        Logical
    }
}
