using Business.Services;
using Data.Services;
using Entity.DTOs;
using Entity.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador API para gestionar permisos de formularios asignados a roles.
    /// Hereda de GenericController para operaciones CRUD estándar con RolFormPermissionDto.
    /// </summary>
    [Route("api/[controller]")]
    public class RolFormPermissionController : GenericController<RolFormPermission,RolFormPermissionDto>
    {
        /// <summary>
        /// Servicio extendido específico para RolFormPermission con funcionalidades adicionales.
        /// </summary>
        private readonly RolFormPermissionRepository _extendedService;

        /// <summary>
        /// Constructor que inyecta el servicio genérico, el servicio extendido y el servicio de logs.
        /// </summary>
        /// <param name="service">Servicio genérico para operaciones CRUD estándar.</param>
        /// <param name="extendedService">Servicio extendido para operaciones específicas de RolFormPermission.</param>
        /// <param name="logService">Servicio para registrar logs de la aplicación.</param>
        public RolFormPermissionController(IBaseModelBusiness<RolFormPermission,RolFormPermissionDto> service, RolFormPermissionRepository extendedService, LogService logService)
            : base(service, logService)
        {
            _extendedService = extendedService;
        }

        /// <summary>
        /// Obtiene todos los permisos de formulario asignados a roles, utilizando la consulta extendida que incluye joins.
        /// </summary>
        /// <returns>Lista de RolFormPermissionDto con información extendida.</returns>
        [HttpGet]
        public override async Task<IActionResult> GetAll()
        {
            var result = await _extendedService.GetAllJoinAsync();
            return Ok(result);
        }
    }
}
