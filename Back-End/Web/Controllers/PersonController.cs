using Business.Services;
using Entity.DTOs;
using Entity.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador API para gestionar operaciones relacionadas con personas.
    /// Hereda de un controlador genérico que implementa las operaciones CRUD básicas para PersonDto.
    /// </summary>
    [Route("api/[controller]")]
    public class PersonController : GenericController<Person,PersonDto>
    {
        /// <summary>
        /// Constructor que recibe el servicio genérico específico para personas y el servicio de logs.
        /// </summary>
        /// <param name="service">Servicio genérico para operaciones CRUD de personas.</param>
        /// <param name="logService">Servicio para registrar logs de la aplicación.</param>
        public PersonController(IBaseModelBusiness<Person,PersonDto> service, LogService logService)
            : base(service, logService)
        {
        }
    }
}
