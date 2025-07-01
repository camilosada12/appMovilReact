using System.Threading.Tasks;
using Entity.DTOs;
using Entity.Model;

namespace Data.Interfaces
{
    /// <summary>
    /// define una estrategia de eliminación para una entidad genérica.
    /// </summary>
    /// <typeparam name="TEntity">tipo de la entidad que hereda de baseModel.</typeparam>
    /// <typeparam name="TDto">tipo del dto correspondiente a la entidad.</typeparam>
    public interface IDeleteStrategy<TEntity, TDto>
        where TEntity : BaseModel
        where TDto : BaseDto
    {
        /// <summary>
        /// ejecuta la lógica de eliminación para la entidad especificada.
        /// </summary>
        /// <param name="id">id de la entidad a eliminar.</param>
        /// <param name="repository">repositorio que maneja el acceso a la entidad.</param>
        /// <returns>true si la eliminación fue exitosa; false en caso contrario.</returns>
        Task<bool> DeleteAsync(int id, IBaseModelData<TEntity, TDto> repository);
    }
}
