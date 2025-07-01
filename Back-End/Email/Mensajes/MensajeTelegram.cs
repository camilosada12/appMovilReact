using System.Threading.Tasks;
using Email.Interfaz;
using Microsoft.Extensions.Configuration;
using Telegram.Bot;
using Telegram.Bot.Types.Enums;

namespace Email.Mensajes
{
    /// <summary>
    /// Clase para enviar mensajes a Telegram utilizando un bot.
    /// Implementa la interfaz <see cref="IMensajeTelegram"/>.
    /// </summary>
    public class MensajeTelegram : IMensajeTelegram
    {
        private readonly TelegramBotClient _bot;
        private readonly long _chatId;

        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="MensajeTelegram"/>.
        /// </summary>
        /// <param name="config">Configuración para obtener el token del bot y el chat ID.</param>
        /// <exception cref="ArgumentException">Lanzada si el ChatId en la configuración es inválido.</exception>
        public MensajeTelegram(IConfiguration config)
        {
            // Inicializa el cliente del bot con el token obtenido de la configuración
            _bot = new TelegramBotClient(config["Telegram:BotToken"]!);

            // Intenta convertir el ChatId configurado a long, si falla lanza excepción
            if (!long.TryParse(config["Telegram:ChatId"], out _chatId))
            {
                throw new ArgumentException("ChatId inválido en la configuración.");
            }
        }

        /// <summary>
        /// Envía un mensaje de texto al chat de Telegram configurado.
        /// </summary>
        /// <param name="texto">Texto del mensaje a enviar.</param>
        /// <returns>Una tarea que representa la operación asíncrona.</returns>
        public async Task EnviarTelegram(string texto)
        {
            await _bot.SendTextMessageAsync(
                chatId: _chatId,
                text: texto,
                parseMode: ParseMode.Markdown
            );
        }
    }
}
