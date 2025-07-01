using Entity.DTOs;

namespace Web.Service_Extensions
{
    /// <summary>
    /// Clase estática que extiende IServiceCollection para agregar la configuración de AutoMapper.
    /// </summary>
    public static class ServiceAutoMapper
    {
        /// <summary>
        /// Método de extensión para registrar AutoMapper en el contenedor de servicios.
        /// </summary>
        /// <param name="services">Colección de servicios donde se agregará AutoMapper.</param>
        /// <returns>La misma colección de servicios para encadenar llamadas.</returns>
        public static IServiceCollection AddAutoMapperConfiguration(this IServiceCollection services)
        {
            // Registra AutoMapper usando el perfil AutoMapperProfile definido en el proyecto
            services.AddAutoMapper(typeof(AutoMapperProfile));
            return services;
        }
    }
}
