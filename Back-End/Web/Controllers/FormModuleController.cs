using Business.Services;
using Data.Services;
using Entity.DTOs;
using Entity.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador para la entidad <see cref="FormModuleDto"/> que extiende la funcionalidad CRUD
    /// básica del <see cref="GenericController{T}"/> con métodos personalizados.
    /// </summary>
    [Route("api/[controller]")]
    public class FormModuleController : GenericController<FormModule,FormModuleDto>
    {

        /// <summary>
        /// Constructor que recibe los servicios necesarios para el controlador.
        /// </summary>
        /// <param name="service">Servicio genérico para operaciones CRUD básicas.</param>
        /// <param name="extendedService">Repositorio específico con métodos extendidos para <see cref="FormModuleDto"/>.</param>
        /// <param name="logService">Servicio para registro de logs.</param>
        public FormModuleController( IBaseModelBusiness<FormModule,FormModuleDto> service, LogService logService) : base(service, logService)
        {
        }
    }
}
