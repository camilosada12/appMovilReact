using Data.Services;
using Email.Interfaz;
using Entity.Context;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Repositorio especializado para la gestión de usuarios.
/// Hereda del repositorio genérico <see cref="Repository{User}"/>.
/// </summary>
public class UserRepository : Repository<User>
{
    private readonly ApplicationDbContext _context;
    private readonly IMensajeCorreo _mensaje;
    private readonly IMensajeTelegram _mensajeTelegram;

    /// <summary>
    /// Constructor que inyecta dependencias necesarias para operaciones de base de datos y notificación.
    /// </summary>
    /// <param name="context">Contexto de la base de datos.</param>
    /// <param name="mensaje">Servicio para enviar correos electrónicos.</param>
    /// <param name="mensajeTelegram">Servicio para enviar mensajes vía Telegram.</param>
    public UserRepository(ApplicationDbContext context, IMensajeCorreo mensaje, IMensajeTelegram mensajeTelegram) : base(context)
    {
        _context = context;
        _mensaje = mensaje;
        _mensajeTelegram = mensajeTelegram;
    }

    /// <summary>
    /// Obtiene todos los usuarios no eliminados lógicamente junto con su información personal.
    /// </summary>
    /// <returns>Lista de <see cref="UserDto"/> con información de usuario y persona.</returns>
    public async Task<IEnumerable<UserDto>> GetAllWithPersonAsync()
    {
        return await _dbSet
            .Include(u => u.person) // Incluye datos de la persona relacionada
            .Where(u => EF.Property<bool>(u, "isdeleted") == false) // Filtra eliminados lógicamente
            .Select(u => new UserDto
            {
                id = u.id,
                UserName = u.username,
                Email = u.email,
                Password = u.password,
                PersonId = u.personid,
                PersonName = u.person.firstname + " " + u.person.lastname
            })
            .ToListAsync();
    }

    /// <summary>
    /// Valida las credenciales del usuario a partir del nombre de usuario y la contraseña.
    /// </summary>
    /// <param name="dto">DTO con los datos de login.</param>
    /// <returns>Instancia del usuario si las credenciales son correctas.</returns>
    /// <exception cref="UnauthorizedAccessException">Se lanza si las credenciales no son válidas.</exception>
    public async Task<User> validacionUser(LoginRequestDto dto)
    {
        bool sucess = false;

        var user = await _context.Set<User>().FirstOrDefaultAsync(u =>
            u.username == dto.UserName &&
            u.password == dto.Password
        );

        sucess = (user != null) ? true : throw new UnauthorizedAccessException("credenciales Incorrectas");

        return user;
    }

    /// <summary>
    /// Obtiene un usuario por su dirección de correo electrónico.
    /// </summary>
    /// <param name="email">Correo electrónico del usuario.</param>
    /// <returns>Instancia del usuario o null si no existe.</returns>
    public async Task<User?> getByEmail(string email)
    {
        return await _context.user.FirstOrDefaultAsync(u => u.email == email);
    }

    /// <summary>
    /// Envía una notificación por Telegram.
    /// </summary>
    /// <param name="texto">Texto del mensaje a enviar.</param>
    public async Task NotificarPorTelegram(string texto)
    {
        await _mensajeTelegram.EnviarTelegram(texto);
    }

    /// <summary>
    /// Obtiene una lista de nombres de roles asignados a un usuario específico.
    /// </summary>
    /// <param name="userId">ID del usuario.</param>
    /// <returns>Lista de nombres de roles.</returns>
    public async Task<List<string>> GetRolesByUserId(int userId)
    {
        var roles = await _context.roluser
            .Where(ru => ru.userid == userId && !ru.isdeleted) // Filtra por usuario y no eliminados
            .Include(ru => ru.Rol) // Incluye información del rol
            .Select(ru => ru.Rol.name)
            .ToListAsync();

        return roles;
    }
}
