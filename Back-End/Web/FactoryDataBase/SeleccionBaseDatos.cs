using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Web.ImplementacionBaseDatos;
using Web.InterfaceFactory;

namespace Web.FactoryDataBase
{
    /// <summary>
    /// Clase que selecciona e instancia la fábrica de base de datos adecuada
    /// según la configuración especificada en appsettings.json.
    /// </summary>
    public class SeleccionBaseDatos
    {
        /// <summary>
        /// Configuración inyectada que contiene las cadenas de conexión y proveedor seleccionado.
        /// </summary>
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Constructor que recibe la configuración del sistema.
        /// </summary>
        /// <param name="configuration">Objeto de configuración inyectado</param>
        public SeleccionBaseDatos(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Obtiene una instancia concreta de la fábrica para el proveedor de base de datos configurado.
        /// </summary>
        /// <returns>Objeto que implementa la interfaz InterfacesFactory para manejar la conexión a la base de datos.</returns>
        /// <exception cref="InvalidOperationException">Se lanza si el proveedor no está soportado.</exception>
        public InterfacesFactory GetFactory()
        {
            // Lee el proveedor de base de datos configurado en appsettings.json bajo la clave "DatabaseProvider"
            var provider = _configuration["DatabaseProvider"];

            // Obtiene la cadena de conexión correspondiente al proveedor configurado
            var connectionString = _configuration.GetConnectionString(provider);

            // Selecciona la implementación concreta de la fábrica basada en el proveedor
            return provider switch
            {
                "SqlServer" => new SqlServer(connectionString),    // Fábrica para SQL Server
                "PostgreSql" => new PostgreSql(connectionString),  // Fábrica para PostgreSQL
                "MySql" => new MySql(connectionString),            // Fábrica para MySQL
                _ => throw new InvalidOperationException("Proveedor de base de datos no soportado") // Error si no existe soporte
            };
        }
    }
}
