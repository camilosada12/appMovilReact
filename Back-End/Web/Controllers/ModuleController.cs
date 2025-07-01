using Business.Services;
using Entity.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador API para gestionar operaciones relacionadas con módulos.
    /// Hereda de un controlador genérico para reutilizar la lógica común.
    /// </summary>
    [Route("api/[controller]")]
    public class ModuleController : GenericController<Module,ModuleDto>
    {
        /// <summary>
        /// Constructor que recibe el servicio genérico específico para módulos y el servicio de logging.
        /// </summary>
        /// <param name="service">Servicio genérico para operaciones CRUD de módulos.</param>
        /// <param name="logService">Servicio para registrar logs de la aplicación.</param>
        public ModuleController(IBaseModelBusiness<Module,ModuleDto> service, LogService logService)
            : base(service, logService)
        {
        }
    }
}
