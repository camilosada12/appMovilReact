using Entity.Context;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Business.Services
{
    /// <summary>
    /// Servicio para registrar logs en la base de datos.
    /// </summary>
    public class LogService
    {
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Constructor que recibe el contexto de la base de datos.
        /// </summary>
        /// <param name="context">Contexto de Entity Framework para acceder a la base de datos.</param>
        public LogService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Registra un log en la base de datos con la información proporcionada.
        /// </summary>
        /// <param name="message">Mensaje del log.</param>
        /// <param name="level">Nivel de severidad del log (e.g. Info, Warning, Error).</param>
        /// <param name="source">Origen o componente que genera el log.</param>
        /// <param name="stackTrace">Traza de la pila de errores (opcional).</param>
        /// <param name="user">Usuario relacionado con el log (opcional).</param>
        /// <returns>Una tarea asíncrona que representa la operación.</returns>
        public async Task RegistrarLog(string message, string level, string source, string? stackTrace = null, string? user = null)
        {
            var log = new Log
            {
                Message = message,
                Level = level,
                Source = source,
                StackTrace = stackTrace,
                UserName = user
            };

            _context.Set<Log>().Add(log);
            await _context.SaveChangesAsync();
        }
    }
}
