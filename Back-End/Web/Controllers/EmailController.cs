using Email.Interfaz;
using Entity.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador API para manejar operaciones relacionadas con el envío de correos electrónicos.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IMensajeCorreo _mensaje;

        /// <summary>
        /// Constructor que inyecta la dependencia para el servicio de envío de mensajes de correo.
        /// </summary>
        /// <param name="mensaje">Servicio encargado de enviar correos electrónicos.</param>
        public EmailController(IMensajeCorreo mensaje)
        {
            _mensaje = mensaje;
        }

        /// <summary>
        /// Endpoint para enviar un correo electrónico con un mensaje predeterminado.
        /// </summary>
        /// <param name="request">Objeto que contiene la información del correo a enviar, incluyendo el email destino.</param>
        /// <returns>Devuelve un resultado HTTP con información sobre el éxito o fallo del envío.</returns>
        /// <response code="200">Correo enviado correctamente.</response>
        /// <response code="400">Falta el campo 'Email' en la solicitud.</response>
        /// <response code="500">Error interno al enviar el correo.</response>
        [HttpPost("enviar-correo")]
        public async Task<IActionResult> EnviarCorreo([FromBody] EmailRequest request)
        {
            // Validación básica del modelo
            if (request == null || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new { success = false, message = "El campo 'Email' es obligatorio." });
            }

            // Asunto del correo
            string asunto = "Notificación importante";

            // Contenido HTML del correo
            string contenido = @"
                <html>
                  <body style='font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;'>
                    <div style='background-color: white; padding: 20px; border-radius: 5px; max-width: 600px; margin: auto;'>
                      <h1 style='color: #007BFF;'>Hola, esto es un correo de prueba</h1>
                      <p>Gracias por usar nuestro servicio. Este correo es para confirmarte que todo funciona correctamente.</p>
                      <p style='font-size: 12px; color: gray; margin-top: 30px;'>© 2025 Tu Empresa. Todos los derechos reservados.</p>
                    </div>
                  </body>
                </html>";

            try
            {
                // Llamada al servicio para enviar el correo
                await _mensaje.EnviarAsync(request.Email, asunto, contenido);

                // Respuesta exitosa
                return Ok(new { success = true, message = "Correo enviado correctamente" });
            }
            catch (Exception ex)
            {
                // Respuesta en caso de error al enviar el correo
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    message = "Ocurrió un error al enviar el correo.",
                    error = ex.Message
                });
            }
        }
    }
}
