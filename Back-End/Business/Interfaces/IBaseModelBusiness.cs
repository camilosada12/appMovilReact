using System.Dynamic;
using Business.Enums;
using Entity.DTOs;
using Entity.Model;

public interface IBaseModelBusiness<T, D> where T : BaseModel where D : BaseDto
{
    Task<List<D>> GetAllAsync();
    /// <summary>
    /// Obtener por ID
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<D> GetByIdAsync(int id);
    /// <summary>
    /// Obtener por code
    /// </summary>
    /// <param name="code"></param>
    /// <returns></returns>
    Task<D> CreateAsync(D entityDto);
    /// <summary>
    /// Guardar Detalles
    /// </summary>
    /// <param name="details"></param>
    /// <returns></returns>
    Task UpdateAsync(D entityDto);

    /// <summary>
    /// Actualizar Detalles
    /// </summary>
    /// <param name="details"></param>
    /// <returns></returns>
    Task<bool> DeleteAsync(int id, DeleteMode mode);

    /// <summary>
    /// DeleteNoLogic
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>

    /// <summary>
    /// ActualizarPatch
    /// </summary>
    /// <param name="id"></param>
    /// <param name="entityDto"></param>
    /// <returns></returns>
    Task<bool> PatchAsync(int id);

    Task<List<D>> GetDeletedAsync();

    /// <summary>
    /// Obtiene una lista dinámica de entidades con relaciones incluidas automáticamente.
    /// </summary>
    /// <returns>Lista de objetos dinámicos con propiedades en PascalCase.</returns>
    Task<List<ExpandoObject>> GetAllDynamicAsync();


}
