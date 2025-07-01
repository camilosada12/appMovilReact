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
    /// Repositorio especializado para gestionar la entidad RolFormPermission.
    /// Hereda de la clase base Repository<RolFormPermission>.
    /// </summary>
    public class RolFormPermissionRepository : Repository<RolFormPermission>
    {
        /// <summary>
        /// Constructor que recibe el contexto de base de datos y lo pasa al repositorio base.
        /// </summary>
        /// <param name="context">Contexto de la base de datos.</param>
        public RolFormPermissionRepository(ApplicationDbContext context) : base(context)
        {
        }

        /// <summary>
        /// Obtiene todos los registros de RolFormPermission que no han sido eliminados lógicamente,
        /// incluyendo los datos relacionados de las entidades Rol, Form y Permission.
        /// </summary>
        /// <returns>
        /// Una lista de objetos <see cref="RolFormPermissionDto"/> que contiene los datos combinados de RolFormPermission, Rol, Form y Permission.
        /// </returns>
        public async Task<IEnumerable<RolFormPermissionDto>> GetAllJoinAsync()
        {
            return await _dbSet
                .Include(x => x.Rol) // Incluye la entidad relacionada Rol
                .Include(x => x.Form) // Incluye la entidad relacionada Form
                .Include(x => x.Permission) // Incluye la entidad relacionada Permission
                .Where(e => EF.Property<bool>(e, "isdeleted") == false) // Filtra los registros no eliminados lógicamente
                .Select(rfp => new RolFormPermissionDto
                {
                    Id = rfp.id,
                    RolId = rfp.rolid,
                    FormId = rfp.formid,
                    Permissionid = rfp.permissionid,
                    RolName = rfp.Rol.name,
                    FormName = rfp.Form.name,
                    PermissionName = rfp.Permission.name
                })
                .ToListAsync();
        }
    }
}
