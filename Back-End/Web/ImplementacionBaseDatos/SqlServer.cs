using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.InterfaceFactory;       // Importa la interfaz para la fábrica de base de datos
using Entity.Context;             // Importa el contexto de la aplicación (DbContext)
using Microsoft.EntityFrameworkCore; // Importa EF Core para configurar el contexto
using Microsoft.Extensions.Configuration;

namespace Web.ImplementacionBaseDatos
{
    /// <summary>
    /// Implementación concreta de la fábrica para la base de datos SQL Server.
    /// </summary>
    public class SqlServer : InterfacesFactory
    {
        /// <summary>
        /// Cadena de conexión a la base de datos SQL Server.
        /// </summary>
        private readonly string _connectionString;

        /// <summary>
        /// Constructor que recibe la cadena de conexión y la almacena.
        /// </summary>
        /// <param name="connectionString">Cadena de conexión a SQL Server</param>
        public SqlServer(string connectionString)
        {
            _connectionString = connectionString;
        }

        /// <summary>
        /// Crea y devuelve una instancia configurada del DbContext para SQL Server.
        /// </summary>
        /// <returns>DbContext configurado para conectar con SQL Server</returns>
        public DbContext CreateDbContext()
        {
            // Crea un builder para configurar las opciones del DbContext
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // Configura el builder para usar SQL Server con la cadena de conexión
            optionsBuilder.UseSqlServer(_connectionString);

            // Retorna una nueva instancia del contexto con las opciones configuradas
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
