using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;  // Importa EF Core para usar DbContext

namespace Web.InterfaceFactory
{
    /// <summary>
    /// Interfaz que define la fábrica para crear instancias de DbContext.
    /// </summary>
    public interface InterfacesFactory
    {
        /// <summary>
        /// Método que crea y devuelve una instancia de DbContext.
        /// </summary>
        /// <returns>Una instancia de DbContext configurada</returns>
        DbContext CreateDbContext();
    }
}
