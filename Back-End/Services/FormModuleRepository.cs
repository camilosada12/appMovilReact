using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Context;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;

namespace Data.Services
{
    /// <summary>
    /// Repositorio especializado para gestionar la entidad FormModule.
    /// Hereda de la clase base Repository<FormModule>.
    /// </summary>
    public class FormModuleRepository : Repository<FormModule>
    {
        /// <summary>
        /// Contexto de base de datos de la aplicación.
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Constructor que recibe el contexto de base de datos y lo pasa al repositorio base.
        /// </summary>
        /// <param name="context">Contexto de la base de datos.</param>
        public FormModuleRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtiene todos los registros de FormModule que no han sido eliminados lógicamente,
        /// incluyendo los datos relacionados de las entidades Form y Module.
        /// </summary>
        /// <returns>
        /// Una lista de objetos <see cref="FormModuleDto"/> que contiene los datos combinados de FormModule, Form y Module.
        /// </returns>
        public async Task<IEnumerable<FormModuleDto>> GetAllJoinAsync()
        {
            return await _dbSet
                .Include(x => x.Form) // Incluye la entidad relacionada Form
                .Include(x => x.Module) // Incluye la entidad relacionada Module
                .Where(e => EF.Property<bool>(e, "isdeleted") == false) // Filtra registros no eliminados lógicamente
                .Select(ru => new FormModuleDto
                {
                    id = ru.id,
                    formid = ru.formid,
                    moduleid = ru.moduleid,
                    formname = ru.Form.name,
                    modulename = ru.Module.name
                })
                .ToListAsync();
        }
    }
}
