using Business.Services;
using Data.Interfaces;
using Data.Services;
using Entity.DTOs;
using Entity.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Service_Extensions
{
    /// <summary>
    /// Clase estática para extender IServiceCollection y agregar la configuración de políticas CORS.
    /// </summary>
    public static class ServicesCors
    {
        /// <summary>
        /// Método de extensión que configura la política CORS usando los valores definidos en la configuración.
        /// </summary>
        /// <param name="services">Colección de servicios para agregar la configuración CORS.</param>
        /// <param name="configuration">Configuración para obtener el origen permitido.</param>
        /// <returns>La misma instancia de IServiceCollection para encadenar configuraciones.</returns>
        public static IServiceCollection AddCorsPolicy(this IServiceCollection services, IConfiguration configuration)
        {
            var origenesPermitidos = configuration.GetSection("Cors:OrigenesPermitidos").Get<string[]>();

            services.AddCors(options =>
            {
                options.AddPolicy("PoliticaCors", policy =>
                {
                    policy.WithOrigins(origenesPermitidos)
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            return services;
        }
    }
}

