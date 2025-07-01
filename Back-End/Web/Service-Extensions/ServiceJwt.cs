using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Web.Service_Extensions
{
    /// <summary>
    /// Clase estática para extender IServiceCollection con la configuración de autenticación JWT.
    /// </summary>
    public static class ServiceJwt
    {
        /// <summary>
        /// Método de extensión que agrega la configuración de autenticación JWT al contenedor de servicios.
        /// </summary>
        /// <param name="services">Colección de servicios donde se agrega la autenticación.</param>
        /// <param name="configuration">Objeto de configuración que contiene la clave secreta para firmar el token JWT.</param>
        /// <returns>La misma instancia de IServiceCollection para permitir encadenar configuraciones.</returns>
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(config =>
            {
                config.DefaultAuthenticateScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(config =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = true;
                config.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
                };
            });

            return services;
        }
    }
}
