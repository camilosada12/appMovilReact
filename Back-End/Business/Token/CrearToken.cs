using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Entity.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Business.Token
{
    /// <summary>
    /// Clase para la generación de tokens JWT para autenticación.
    /// </summary>
    public class CrearToken
    {
        private readonly IConfiguration _configuration;
        private readonly UserRepository _user;

        /// <summary>
        /// Constructor que recibe la configuración y el repositorio de usuarios.
        /// </summary>
        /// <param name="configuration">Configuración para obtener claves y tiempos de expiración.</param>
        /// <param name="user">Repositorio para validación y consulta de usuarios.</param>
        public CrearToken(IConfiguration configuration, UserRepository user)
        {
            this._configuration = configuration;
            _user = user;
        }

        /// <summary>
        /// Crea un token JWT válido para un usuario dado, basado en sus credenciales.
        /// </summary>
        /// <param name="dto">Datos de inicio de sesión del usuario.</param>
        /// <returns>Token JWT en formato string.</returns>
        /// <exception cref="UnauthorizedAccessException">Lanzada si las credenciales son incorrectas.</exception>
        public async Task<string> crearToken(LoginRequestDto dto)
        {
            // Validar usuario con credenciales recibidas
            var user = await _user.validacionUser(dto);
            if (user == null)
            {
                throw new UnauthorizedAccessException("credenciales incorrectas");
            }

            /// obtener los roles asignados al usuario
            var roles = await _user.GetRolesByUserId(user.id);

            // obtener los permisos que tiene por los roles
            var permisos = await _user.GetPermissionsByUserId(user.id);


            // Construir claims base para el token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
                new Claim(ClaimTypes.Name, user.username),
                new Claim("email", user.email),
            };

            // Agregar claims de roles
            foreach (var rol in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, rol));
            }

            // agregar claims de permisos
            foreach (var permiso in permisos)
            {
                claims.Add(new Claim("permission", permiso));
            }


            // Crear llave de seguridad usando la clave secreta configurada
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            // Configurar el token JWT con claims, tiempo de expiración y firma
            var jwtConfig = new JwtSecurityToken
            (
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:Expiration"])),
                signingCredentials: credentials
            );

            // Retornar el token serializado
            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }
    }
}
