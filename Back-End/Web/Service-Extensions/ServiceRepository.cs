using Business.Token;
using Data.Services;
using Email.Interfaz;
using Email.Mensajes;

namespace Web.Service_Extensions
{
    /// <summary>
    /// Clase estática para extender IServiceCollection y registrar los repositorios y servicios relacionados.
    /// </summary>
    public static class ServiceRepository
    {
        /// <summary>
        /// Método de extensión que registra en el contenedor de servicios los repositorios y servicios necesarios.
        /// </summary>
        /// <param name="services">Colección de servicios donde se registran los repositorios y servicios.</param>
        /// <returns>La misma instancia de IServiceCollection para permitir encadenar configuraciones.</returns>
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<RolUserRepository>();
            services.AddScoped<RolFormPermissionRepository>();
            services.AddScoped<UserRepository>();
            services.AddScoped<CrearToken>();

            services.AddScoped<IMensajeCorreo, CorreoMensaje>();
            services.AddScoped<IMensajeTelegram, MensajeTelegram>(); // ✅ Esto es lo que faltaba

            return services;
        }
    }
}
