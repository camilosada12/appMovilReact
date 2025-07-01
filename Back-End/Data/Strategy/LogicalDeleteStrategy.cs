using System.Threading.Tasks;
using Data.Interfaces;
using Entity.Model;
using Entity.DTOs;

namespace Data.Services
{
    public class LogicalDeleteStrategy<TEntity, TDto> : IDeleteStrategy<TEntity, TDto>
        where TEntity : BaseModel
        where TDto : BaseDto
    {
        public async Task<bool> DeleteAsync(int id, IBaseModelData<TEntity, TDto> repository)
        {
            var result = await repository.DeleteLogicalAsync(id);
            return result > 0; // suponiendo que retorna el número de filas afectadas
        }
    }
}
