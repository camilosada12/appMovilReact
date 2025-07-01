using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Email.Interfaz
{
    /// <summary>
    /// Interfaz para enviar mensajes por correo electrónico.
    /// </summary>
    public interface IMensajeCorreo
    {
        /// <summary>
        /// Envía un correo electrónico de forma asíncrona.
        /// </summary>
        /// <param name="destinatario">Dirección de correo electrónico del destinatario.</param>
        /// <param name="asunto">Asunto del correo electrónico.</param>
        /// <param name="contenido">Contenido o cuerpo del mensaje.</param>
        /// <returns>Una tarea que representa la operación asíncrona.</returns>
        Task EnviarAsync(string destinatario, string asunto, string contenido);
    }

    /// <summary>
    /// Interfaz para enviar mensajes a través de Telegram.
    /// </summary>
    public interface IMensajeTelegram
    {
        /// <summary>
        /// Envía un mensaje de texto por Telegram de forma asíncrona.
        /// </summary>
        /// <param name="texto">Texto del mensaje a enviar.</param>
        /// <returns>Una tarea que representa la operación asíncrona.</returns>
        Task EnviarTelegram(string texto);
    }
}
