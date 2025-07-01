using Entity.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Web.FactoryDataBase;

namespace Web.Service_Extensions
{
    /// <summary>
    /// Clase estática para extender IServiceCollection y registrar el contexto de base de datos
    /// usando una fábrica que selecciona el proveedor de base de datos según la configuración.
    /// </summary>
    public static class ServiceDatabase
    {
        /// <summary>
        /// Método de extensión que registra ApplicationDbContext en el contenedor de servicios
        /// usando una fábrica de base de datos basada en la configuración.
        /// </summary>
        /// <param name="services">Colección de servicios para agregar la configuración de la base de datos.</param>
        /// <param name="configuration">Objeto de configuración que contiene la información del proveedor y cadena de conexión.</param>
        /// <returns>La misma instancia de IServiceCollection para encadenar llamadas.</returns>
        public static IServiceCollection AddDatabaseFactory(this IServiceCollection services, IConfiguration configuration)
        {
            // Instancia la clase que selecciona la fábrica de base de datos según la configuración
            var service = new SeleccionBaseDatos(configuration);

            // Obtiene la fábrica concreta (SqlServer, MySql, PostgreSql) para crear el DbContext
            var dbFactory = service.GetFactory();

            // Registra ApplicationDbContext usando la fábrica para crear la instancia del DbContext
            services.AddScoped(provider => (ApplicationDbContext)dbFactory.CreateDbContext());

            // Retorna la colección de servicios para permitir más configuraciones encadenadas
            return services;
        }
    }
}
