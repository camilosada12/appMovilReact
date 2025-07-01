using AutoMapper;
using Data.Services;
using Entity.Context;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

/// <summary>
/// Repositorio especializado para la gestión de relaciones entre usuarios y roles (RolUser).
/// Hereda de la clase base Repository<RolUser>.
/// </summary>

public class RolUserRepository : BaseModelData<RolUser, RolUserDto>
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Constructor que recibe el contexto de base de datos y lo pasa al repositorio base.
    /// </summary>
    /// <param name="context">Contexto de base de datos de la aplicación.</param>
    public RolUserRepository(ApplicationDbContext context, IConfiguration configuration, IMapper mapper) : base(context, configuration, mapper)
    {
        _context = context;
    }

    /// <summary>
    /// Obtiene todos los registros de RolUser (usuario-rol) no eliminados lógicamente,
    /// incluyendo los datos relacionados del usuario y del rol.
    /// </summary>
    /// <returns>
    /// Una lista de <see cref="RolUserDto"/> con los datos del usuario y su rol.
    /// </returns>
    public async Task<IEnumerable<RolUserDto>> GetAllJoinAsync()
    {
        return await _context.roluser
            .Include(x => x.User) // Incluye los datos del usuario relacionado
            .Include(x => x.Rol)  // Incluye los datos del rol relacionado
            .Where(e => EF.Property<bool>(e, "isdeleted") == false) // Solo trae los que no están eliminados lógicamente
            .Select(ru => new RolUserDto
            {
                Id = ru.id,
                UserId = ru.userid,
                RolId = ru.rolid,
            })
            .ToListAsync();
    }

    /// <summary>
    /// Obtiene el nombre del rol asignado a un usuario específico.
    /// </summary>
    /// <param name="userId">ID del usuario.</param>
    /// <returns>Nombre del rol si existe, o null si no tiene rol o está eliminado.</returns>
    public async Task<string?> GetRolNameByUserId(int userId)
    {
        var rolUser = await _context.roluser
            .Include(ru => ru.Rol)
            .FirstOrDefaultAsync(ru => ru.userid == userId && !ru.isdeleted);

        return rolUser?.Rol?.name;
    }

    /// <summary>
    /// Asigna un rol a un usuario creando una nueva relación RolUser.
    /// </summary>
    /// <param name="userId">ID del usuario.</param>
    /// <param name="rolId">ID del rol.</param>
    /// <returns>Una tarea asincrónica que representa la operación.</returns>
    public async Task AsignarRol(int userId, int rolId)
    {
        var nuevaRelacion = new RolUser
        {
            userid = userId,
            rolid = rolId
        };

        _context.roluser.Add(nuevaRelacion); // Agrega la nueva relación al contexto
        await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos
    }
}