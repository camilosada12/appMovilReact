using Business.Enums;
using Business.Services;
using Entity.DTOs;
using Entity.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using System.Threading.Tasks;
using Utilities.Exeptions;

namespace Web.Controllers
{
    /// <summary>
    /// Controlador genérico base para manejar operaciones CRUD sobre DTOs de tipo <typeparamref name="TDto"/>.
    /// Provee endpoints comunes para obtener, crear, actualizar y eliminar registros.
    /// </summary>
    /// <typeparam name="TDto">Tipo del DTO que manejará el controlador.</typeparam>
    [ApiController]
    [Route("api/[controller]")]
    public class GenericController<TEntity,TDto> : ControllerBase where TEntity : BaseModel where TDto : BaseDto
    {
        private readonly IBaseModelBusiness<TEntity, TDto> _service;
        private readonly LogService _logService;

        /// <summary>
        /// Inicializa una nueva instancia del controlador genérico.
        /// </summary>
        /// <param name="service">Servicio genérico para las operaciones CRUD.</param>
        /// <param name="logService">Servicio para registrar logs de la aplicación.</param>
        public GenericController(IBaseModelBusiness<TEntity, TDto> service, LogService logService)
        {
            _service = service;
            _logService = logService;
        }

        /// <summary>
        /// Obtiene todos los registros del tipo <typeparamref name="TDto"/>.
        /// </summary>
        /// <returns>Lista con todos los registros.</returns>
        [HttpGet]
        public virtual async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _service.GetAllAsync();
                await _logService.RegistrarLog(
                    $"se consultaron todos los registros de tipo {typeof(TDto).Name}.",
                    "info",
                    $"{typeof(TDto).Name}_GetAll",
                    null,
                    User?.Identity?.Name
                );
                return Ok(result);
            }
            catch (ValidationException vex)
            {
                await _logService.RegistrarLog(vex.Message, "warning", $"{typeof(TDto).Name}_GetAll_Validation", vex.StackTrace, User?.Identity?.Name);
                return BadRequest(new { error = vex.Message });
            }
            catch (BusinessException bex)
            {
                await _logService.RegistrarLog(bex.Message, "warning", $"{typeof(TDto).Name}_GetAll_Business", bex.StackTrace, User?.Identity?.Name);
                return Conflict(new { error = bex.Message });
            }
            catch (Exception ex)
            {
                await _logService.RegistrarLog(ex.Message, "error", $"{typeof(TDto).Name}_GetAll", ex.StackTrace, User?.Identity?.Name);
                return StatusCode(500, new { error = "error interno" });
            }
        }

        /// <summary>
        /// Obtiene un registro por su identificador.
        /// </summary>
        /// <param name="id">Identificador del registro a obtener.</param>
        /// <returns>El registro solicitado o un error si no existe.</returns>
        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _service.GetByIdAsync(id);
                if (result == null)
                {
                    await _logService.RegistrarLog(
                        $"registro no encontrado de tipo {typeof(TDto).Name} con id {id}.",
                        "info",
                        $"{typeof(TDto).Name}_GetById_NotFound",
                        null,
                        User?.Identity?.Name
                    );
                    return NotFound(new { error = "registro no encontrado" });
                }

                await _logService.RegistrarLog(
                    $"se consultó el registro de tipo {typeof(TDto).Name} con id {id}.",
                    "info",
                    $"{typeof(TDto).Name}_GetById",
                    null,
                    User?.Identity?.Name
                );
                return Ok(result);
            }
            catch (ValidationException vex)
            {
                await _logService.RegistrarLog(vex.Message, "warning", $"{typeof(TDto).Name}_GetById_Validation", vex.StackTrace, User?.Identity?.Name);
                return BadRequest(new { error = vex.Message });
            }
            catch (BusinessException bex)
            {
                await _logService.RegistrarLog(bex.Message, "warning", $"{typeof(TDto).Name}_GetById_Business", bex.StackTrace, User?.Identity?.Name);
                return Conflict(new { error = bex.Message });
            }
            catch (Exception ex)
            {
                await _logService.RegistrarLog(ex.Message, "error", $"{typeof(TDto).Name}_GetById", ex.StackTrace, User?.Identity?.Name);
                return StatusCode(500, new { error = "error interno" });
            }
        }

        /// <summary>
        /// Crea un nuevo registro del tipo <typeparamref name="TDto"/>.
        /// </summary>
        /// <param name="dto">DTO con la información del nuevo registro.</param>
        /// <returns>El registro creado.</returns>
        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] TDto dto)
        {
            try
            {
                var result = await _service.CreateAsync(dto);
                await _logService.RegistrarLog(
                    $"se creó un registro de tipo {typeof(TDto).Name}. contenido: {JsonSerializer.Serialize(dto)}",
                    "info",
                    $"{typeof(TDto).Name}_Create",
                    null,
                    User?.Identity?.Name
                );
                return Ok(result);
            }
            catch (ValidationException vex)
            {
                await _logService.RegistrarLog(vex.Message, "warning", $"{typeof(TDto).Name}_Create_Validation", vex.StackTrace, User?.Identity?.Name);
                return BadRequest(new { error = vex.Message });
            }
            catch (BusinessException bex)
            {
                await _logService.RegistrarLog(bex.Message, "warning", $"{typeof(TDto).Name}_Create_Business", bex.StackTrace, User?.Identity?.Name);
                return Conflict(new { error = bex.Message });
            }
            catch (Exception ex)
            {
                await _logService.RegistrarLog(ex.Message, "error", $"{typeof(TDto).Name}_Create", ex.StackTrace, User?.Identity?.Name);
                return StatusCode(500, new { error = "error interno" });
            }
        }

        /// <summary>
        /// Actualiza un registro existente del tipo <typeparamref name="TDto"/>.
        /// </summary>
        /// <param name="dto">DTO con la información actualizada del registro.</param>
        /// <returns>El registro actualizado.</returns>
        [HttpPut]
        public virtual async Task<IActionResult> Update([FromBody] TDto dto)
        {
            try
            {
                await _service.UpdateAsync(dto);
                await _logService.RegistrarLog(
                    $"se actualizó un registro de tipo {typeof(TDto).Name}. contenido: {JsonSerializer.Serialize(dto)}",
                    "info",
                    $"{typeof(TDto).Name}_Update",
                    null,
                    User?.Identity?.Name
                );
                return Ok(); 
            }
            catch (ValidationException vex)
            {
                await _logService.RegistrarLog(vex.Message, "warning", $"{typeof(TDto).Name}_Update_Validation", vex.StackTrace, User?.Identity?.Name);
                return BadRequest(new { error = vex.Message });
            }
            catch (BusinessException bex)
            {
                await _logService.RegistrarLog(bex.Message, "warning", $"{typeof(TDto).Name}_Update_Business", bex.StackTrace, User?.Identity?.Name);
                return Conflict(new { error = bex.Message });
            }
            catch (Exception ex)
            {
                await _logService.RegistrarLog(ex.Message, "error", $"{typeof(TDto).Name}_Update", ex.StackTrace, User?.Identity?.Name);
                return StatusCode(500, new { error = "error interno" });
            }
        }

            [HttpGet("deleted")]
            public virtual async Task<IActionResult> GetDeleted()
            {
                try
                {
                    var result = await _service.GetDeletedAsync();
                    await _logService.RegistrarLog(
                        $"se consultaron los registros eliminados lógicamente de tipo {typeof(TDto).Name}.",
                        "info",
                        $"{typeof(TDto).Name}_GetDeleted",
                        null,
                        User?.Identity?.Name
                    );
                    return Ok(result);
                }
                catch (ValidationException vex)
                {
                    await _logService.RegistrarLog(vex.Message, "warning", $"{typeof(TDto).Name}_GetDeleted_Validation", vex.StackTrace, User?.Identity?.Name);
                    return BadRequest(new { error = vex.Message });
                }
                catch (BusinessException bex)
                {
                    await _logService.RegistrarLog(bex.Message, "warning", $"{typeof(TDto).Name}_GetDeleted_Business", bex.StackTrace, User?.Identity?.Name);
                    return Conflict(new { error = bex.Message });
                }
                catch (Exception ex)
                {
                    await _logService.RegistrarLog(ex.Message, "error", $"{typeof(TDto).Name}_GetDeleted", ex.StackTrace, User?.Identity?.Name);
                    return StatusCode(500, new { error = "error interno" });
                }
            }



        /// <summary>
        /// Elimina un registro existente por su identificador.
        /// </summary>
        /// <param name="id">Identificador del registro a eliminar.</param>
        /// <param name="mode">Modo de eliminación (físico o lógico).</param>
        /// <returns>Resultado de la operación: OK si fue exitoso, NotFound si no existía el registro.</returns>

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id, [FromQuery] DeleteMode mode = DeleteMode.fisico)
        {
            try
            {
                var result = await _service.DeleteAsync(id, mode);
                await _logService.RegistrarLog(
                    $"se eliminó un registro de tipo {typeof(TDto).Name} con id {id} usando modo {mode}.",
                    "info",
                    $"{typeof(TDto).Name}_Delete_{mode}",
                    null,
                    User?.Identity?.Name
                );
                return Ok();
            }
            catch (ValidationException vex)
            {
                await _logService.RegistrarLog(vex.Message, "warning", $"{typeof(TDto).Name}_Delete_Validation", vex.StackTrace, User?.Identity?.Name);
                return BadRequest(new { error = vex.Message });
            }
            catch (BusinessException bex)
            {
                await _logService.RegistrarLog(bex.Message, "warning", $"{typeof(TDto).Name}_Delete_Business", bex.StackTrace, User?.Identity?.Name);
                return Conflict(new { error = bex.Message });
            }
            catch (Exception ex)
            {
                await _logService.RegistrarLog(ex.Message, "error", $"{typeof(TDto).Name}_Delete", ex.StackTrace, User?.Identity?.Name);
                return StatusCode(500, new { error = "error interno" });
            }
        }

        /// <summary>
        /// Reactiva (desmarca como eliminado) un registro del tipo <typeparamref name="TDto"/>.
        /// </summary>
        /// <param name="id">ID del registro a reactivar.</param>
        /// <returns>Resultado de la operación de reactivación.</returns>
        [HttpPatch("{id}")]
        public virtual async Task<IActionResult> Patch(int id)
        {
            try
            {
                var result = await _service.PatchAsync(id);

                if (!result)
                {
                    await _logService.RegistrarLog(
                        $"No se encontró el registro con ID {id} para reactivar de tipo {typeof(TDto).Name}.",
                        "warning",
                        $"{typeof(TDto).Name}_Patch_NotFound",
                        null,
                        User?.Identity?.Name
                    );
                    return NotFound(new { error = $"Registro con ID {id} no encontrado" });
                }

                await _logService.RegistrarLog(
                    $"Se reactivó el registro con ID {id} de tipo {typeof(TDto).Name}.",
                    "info",
                    $"{typeof(TDto).Name}_Patch",
                    null,
                    User?.Identity?.Name
                );

                return Ok(new { message = "Registro reactivado exitosamente", id = id });
            }
            catch (ValidationException vex)
            {
                await _logService.RegistrarLog(vex.Message, "warning", $"{typeof(TDto).Name}_Patch_Validation", vex.StackTrace, User?.Identity?.Name);
                return BadRequest(new { error = vex.Message });
            }
            catch (BusinessException bex)
            {
                await _logService.RegistrarLog(bex.Message, "warning", $"{typeof(TDto).Name}_Patch_Business", bex.StackTrace, User?.Identity?.Name);
                return Conflict(new { error = bex.Message });
            }
            catch (Exception ex)
            {
                await _logService.RegistrarLog(ex.Message, "error", $"{typeof(TDto).Name}_Patch", ex.StackTrace, User?.Identity?.Name);
                return StatusCode(500, new { error = "error interno" });
            }
        }

        /// <summary>
        /// Obtiene una lista dinámica de registros.
        /// </summary>
        /// <returns>Lista dinámica de registros o un error si falla el proceso.</returns>
        [HttpGet("dynamic")]
        public virtual async Task<IActionResult> GetDynamicAsync()
        {
            try
            {
                var result = await _service.GetAllDynamicAsync();

                await _logService.RegistrarLog(
                    $"se consultaron registros dinámicos de tipo {typeof(TDto).Name}.",
                    "info",
                    $"{typeof(TDto).Name}_GetDynamic",
                    null,
                    User?.Identity?.Name
                );

                return Ok(result);
            }
            catch (ValidationException vex)
            {
                await _logService.RegistrarLog(
                    vex.Message,
                    "warning",
                    $"{typeof(TDto).Name}_GetDynamic_Validation",
                    vex.StackTrace,
                    User?.Identity?.Name
                );

                return BadRequest(new { error = vex.Message });
            }
            catch (BusinessException bex)
            {
                await _logService.RegistrarLog(
                    bex.Message,
                    "warning",
                    $"{typeof(TDto).Name}_GetDynamic_Business",
                    bex.StackTrace,
                    User?.Identity?.Name
                );

                return Conflict(new { error = bex.Message });
            }
            catch (Exception ex)
            {
                await _logService.RegistrarLog(
                    ex.Message,
                    "error",
                    $"{typeof(TDto).Name}_GetDynamic",
                    ex.StackTrace,
                    User?.Identity?.Name
                );

                return StatusCode(500, new { error = "error interno" });
            }
        }

    }
}
