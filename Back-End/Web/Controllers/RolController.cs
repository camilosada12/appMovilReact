using Business.Services;
using Entity.DTOs;
using Entity.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador API para gestionar operaciones relacionadas con roles.
    /// Hereda de un controlador genérico que implementa las operaciones CRUD básicas para rolDto.
    /// </summary>
    [Route("api/[controller]")]
    public class RolController : GenericController<rol,rolDto>
    {
        /// <summary>
        /// Constructor que recibe el servicio genérico específico para roles y el servicio de logs.
        /// </summary>
        /// <param name="service">Servicio genérico para operaciones CRUD de roles.</param>
        /// <param name="logService">Servicio para registrar logs de la aplicación.</param>
        public RolController(IBaseModelBusiness<rol,rolDto> service, LogService logService)
            : base(service, logService)
        {
        }
    }
}
