using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador API para enviar mensajes mediante Telegram.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class mensajeTelegram : ControllerBase
    {
        /// <summary>
        /// Repositorio para manejar datos relacionados con usuarios.
        /// </summary>
        private readonly UserRepository _userRepository;

        /// <summary>
        /// Logger para registrar información y errores.
        /// </summary>
        private readonly ILogger<mensajeTelegram> _logger;

        /// <summary>
        /// Constructor que inyecta las dependencias necesarias.
        /// </summary>
        /// <param name="userRepository">Repositorio de usuarios.</param>
        /// <param name="logger">Servicio de logging.</param>
        public mensajeTelegram(UserRepository userRepository, ILogger<mensajeTelegram> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        /// <summary>
        /// Envia un mensaje recibido en el cuerpo de la petición a través de Telegram.
        /// </summary>
        /// <param name="mensaje">Texto del mensaje a enviar por Telegram.</param>
        /// <returns>Resultado de la operación con estado HTTP y mensaje descriptivo.</returns>
        [HttpPost("telegram")]
        public async Task<IActionResult> EnviarMensajeTelegram([FromBody] string mensaje)
        {
            // Valida que el mensaje no esté vacío o sea solo espacios en blanco
            if (string.IsNullOrWhiteSpace(mensaje))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "El mensaje no puede estar vacío."
                });
            }

            try
            {
                // Llama al método que realiza la notificación vía Telegram
                await _userRepository.NotificarPorTelegram(mensaje);

                // Retorna un estado OK con mensaje de éxito
                return Ok(new
                {
                    success = true,
                    message = "Mensaje enviado correctamente por Telegram."
                });
            }
            catch (Exception ex)
            {
                // Loguea el error para diagnóstico
                _logger.LogError(ex, "Error al enviar mensaje por Telegram.");

                // Retorna un error 500 con mensaje amigable
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    message = "Ocurrió un error al enviar el mensaje por Telegram."
                });
            }
        }
    }
}
