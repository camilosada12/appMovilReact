using Data.Interfaces;
using Data.Services;
using Email.Interfaz;
using Entity.Context;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;

public class UserRepository : BaseModelData<User, UserDto>
{
    private readonly ApplicationDbContext _context;
    private readonly IMensajeCorreo _mensaje;
    private readonly IMensajeTelegram _mensajeTelegram;

    public UserRepository(ApplicationDbContext context, IMensajeCorreo mensaje, IMensajeTelegram mensajeTelegram, AutoMapper.IMapper mapper)
        : base(context, null!, mapper) // null! porque IConfiguration no se usa aquí; puedes inyectarla si la necesitas
    {
        _context = context;
        _mensaje = mensaje;
        _mensajeTelegram = mensajeTelegram;
    }

    public async Task<IEnumerable<UserDto>> GetAllWithPersonAsync()
    {
        return await _context.user
            .Include(u => u.person)
            .Where(u => EF.Property<bool>(u, "isdeleted") == false)
            .Select(u => new UserDto
            {
                Id = u.id,
                UserName = u.username,
                Email = u.email,
                Password = u.password,
                PersonId = u.personid,
            })
            .ToListAsync();
    }

    public async Task<List<string>> GetPermissionsByUserId(int userId)
    {
        // obtener los ids de roles que tiene el usuario
        var userRoleIds = await _context.roluser
            .Where(ru => ru.userid == userId && !ru.isdeleted)
            .Select(ru => ru.rolid)
            .ToListAsync();

        // obtener los nombres de los permisos asociados a esos roles
        var permissions = await _context.rolformpermission
            .Where(rfp => userRoleIds.Contains(rfp.rolid) && !rfp.isdeleted)
            .Include(rfp => rfp.Permission)
            .Select(rfp => rfp.Permission.name)
            .Distinct()
            .ToListAsync();

        return permissions;
    }


    public async Task<User> validacionUser(LoginRequestDto dto)
    {
        var user = await _context.user.FirstOrDefaultAsync(u =>
            u.username == dto.UserName &&
            u.password == dto.Password);

        return user ?? throw new UnauthorizedAccessException("credenciales incorrectas");
    }

    public async Task<User?> getByEmail(string email)
    {
        return await _context.user.FirstOrDefaultAsync(u => u.email == email);
    }

    public async Task NotificarPorTelegram(string texto)
    {
        await _mensajeTelegram.EnviarTelegram(texto);
    }

    public async Task<List<string>> GetRolesByUserId(int userId)
    {
        return await _context.roluser
            .Where(ru => ru.userid == userId && !ru.isdeleted)
            .Include(ru => ru.Rol)
            .Select(ru => ru.Rol.name)
            .ToListAsync();
    }
}