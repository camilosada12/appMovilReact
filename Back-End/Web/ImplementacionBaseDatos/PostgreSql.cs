using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.InterfaceFactory;         // Importa la interfaz que debe implementar la fábrica de base de datos
using Entity.Context;               // Importa el contexto de la aplicación (DbContext)
using Microsoft.EntityFrameworkCore; // Importa EF Core para la configuración del contexto
using Microsoft.EntityFrameworkCore.Internal;

namespace Web.ImplementacionBaseDatos
{
    /// <summary>
    /// Implementación concreta de la fábrica para la base de datos PostgreSQL.
    /// </summary>
    public class PostgreSql : InterfacesFactory
    {
        /// <summary>
        /// Cadena de conexión para la base de datos PostgreSQL.
        /// </summary>
        private readonly string _connectionString;

        /// <summary>
        /// Constructor que recibe la cadena de conexión y la almacena.
        /// </summary>
        /// <param name="connectionString">Cadena de conexión a PostgreSQL</param>
        public PostgreSql(string connectionString)
        {
            _connectionString = connectionString;
        }

        /// <summary>
        /// Crea y devuelve una instancia configurada del DbContext para PostgreSQL.
        /// </summary>
        /// <returns>DbContext configurado para conectar con PostgreSQL</returns>
        public DbContext CreateDbContext()
        {
            // Crea un builder de opciones para configurar el DbContext
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // Configura el builder para usar PostgreSQL con la cadena de conexión
            optionsBuilder.UseNpgsql(_connectionString);

            // Retorna una nueva instancia del contexto con las opciones configuradas
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
