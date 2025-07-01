using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;
using Email.Interfaz;

namespace Email.Mensajes
{
    /// <summary>
    /// Clase para enviar correos electrónicos utilizando SMTP.
    /// Implementa la interfaz <see cref="IMensajeCorreo"/>.
    /// </summary>
    public class CorreoMensaje : IMensajeCorreo
    {
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="CorreoMensaje"/>.
        /// </summary>
        /// <param name="configuration">Configuración para obtener los parámetros SMTP.</param>
        public CorreoMensaje(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Envía un correo electrónico de forma asíncrona.
        /// </summary>
        /// <param name="destinatario">Correo electrónico del destinatario.</param>
        /// <param name="asunto">Asunto del correo electrónico.</param>
        /// <param name="contenido">Contenido HTML del correo electrónico.</param>
        /// <returns>Una tarea que representa la operación asíncrona.</returns>
        public async Task EnviarAsync(string destinatario, string asunto, string contenido)
        {
            // Obtiene la sección de configuración SMTP desde appsettings.json o similar
            var smtpConfig = _configuration.GetSection("SmtpSettings");

            // Crea el mensaje de correo con los datos especificados
            var mensaje = new MailMessage
            {
                From = new MailAddress(smtpConfig["Email"]),
                Subject = asunto,
                Body = contenido,
                IsBodyHtml = true
            };

            mensaje.To.Add(destinatario);

            // Configura el cliente SMTP con la información de configuración
            using var client = new SmtpClient
            {
                Host = smtpConfig["Host"],
                Port = int.Parse(smtpConfig["Port"]),
                EnableSsl = bool.Parse(smtpConfig["EnableSsl"]),
                Credentials = new NetworkCredential(smtpConfig["Email"], smtpConfig["Password"])
            };

            // Envía el correo de forma asíncrona
            await client.SendMailAsync(mensaje);
        }
    }
}
