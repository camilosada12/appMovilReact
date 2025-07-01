using Entity.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Business.Token;
using Entity.Model;
using Google.Apis.Auth;
using Business.Services;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador para manejar el proceso de autenticación y login de usuarios.
    /// Soporta login tradicional con usuario y contraseña, así como login con Google.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private readonly CrearToken _token;
        private readonly ILogger<LoginController> _logger;
        private readonly IConfiguration _configuration;
        private readonly UserRepository _user;

        /// <summary>
        /// Constructor con inyección de dependencias para servicios de token, logging, configuración y acceso a usuarios.
        /// </summary>
        public LoginController(CrearToken token, ILogger<LoginController> logger, IConfiguration configuration, UserRepository user, LogService logService)
        {
            _token = token;
            _logger = logger;
            _configuration = configuration;
            _user = user;
        }

        /// <summary>
        /// Endpoint para autenticación tradicional con usuario y contraseña.
        /// Valida el DTO recibido, intenta generar un token JWT y lo devuelve en la respuesta.
        /// </summary>
        /// <param name="dto">DTO con UserName y Password</param>
        /// <returns>Token JWT si la autenticación es exitosa, mensaje de error en caso contrario.</returns>
        [HttpPost]
        public async Task<IActionResult> login([FromBody] LoginRequestDto dto)
        {
            if (dto == null)
                return BadRequest(new { isSucces = false, message = "El cuerpo de la solicitud no puede estar vacío." });

            if (string.IsNullOrWhiteSpace(dto.UserName) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest(new { isSucces = false, message = "Usuario y contraseña son obligatorios." });

            try
            {
                var token = await _token.crearToken(dto);
                return Ok(new { isSucces = true, token });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Validación fallida, error al crear el token.");
                return BadRequest(new { isSucces = false, message = ex.Message });
            }
        }

        /// <summary>
        /// Endpoint para autenticación mediante token de Google.
        /// Valida el token recibido con la API de Google, verifica que el usuario exista en la base de datos
        /// y genera un token JWT propio para el usuario.
        /// </summary>
        /// <param name="tokenDto">DTO con el token JWT de Google</param>
        /// <returns>Token JWT generado si la autenticación es exitosa, mensaje de error en caso contrario.</returns>
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenDto tokenDto)
        {
            if (tokenDto == null || string.IsNullOrWhiteSpace(tokenDto.Token))
                return BadRequest(new { isSucces = false, message = "El token de Google es obligatorio." });

            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenDto.Token, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { _configuration["Google:ClientId"] }
                });

                var user = await _user.getByEmail(payload.Email);

                if (user == null)
                    return NotFound(new { isSucces = false, message = "El usuario no existe." });

                var dto = new LoginRequestDto
                {
                    UserName = user.username,
                    Password = user.password
                };

                var token = await _token.crearToken(dto);
                return Ok(new { isSucces = true, token });
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error en login con Google.");
                return BadRequest(new { isSucces = false, message = ex.Message });
            }
        }
    }
}
