using Entity.DTOs;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers;
using Business.Services;
using Data.Services;
using Microsoft.AspNetCore.Authorization;
using Entity.Model;

/// <summary>
/// Controlador API para gestionar la relación entre roles y usuarios.
/// Hereda de GenericController para operaciones CRUD estándar con RolUserDto.
/// </summary>
[Route("api/[controller]")]
public class RolUserController : GenericController<RolUser,RolUserDto>
{
    /// <summary>
    /// Servicio extendido específico para RolUser con funcionalidades adicionales.
    /// </summary>
    private readonly RolUserRepository _extendedService;

    /// <summary>
    /// Constructor que inyecta el servicio genérico, el servicio extendido y el servicio de logs.
    /// </summary>
    /// <param name="service">Servicio genérico para operaciones CRUD estándar.</param>
    /// <param name="extendedService">Servicio extendido para operaciones específicas de RolUser.</param>
    /// <param name="logService">Servicio para registrar logs de la aplicación.</param>
    public RolUserController(IBaseModelBusiness<RolUser,RolUserDto> service, RolUserRepository extendedService, LogService logService)
        : base(service, logService)
    {
        _extendedService = extendedService;
    }

    /// <summary>
    /// Obtiene todos los registros de RolUser, utilizando una consulta extendida que incluye joins para información adicional.
    /// </summary>
    /// <returns>Lista de RolUserDto con datos extendidos.</returns>
    [HttpGet]
    public override async Task<IActionResult> GetAll()
    {
        var result = await _extendedService.GetAllJoinAsync();
        return Ok(result);
    }
}
