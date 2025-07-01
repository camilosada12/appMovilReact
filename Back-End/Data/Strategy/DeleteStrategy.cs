using System.Threading.Tasks;
using Data.Interfaces;
using Entity.DTOs;
using Entity.Model;

namespace Data
{
    public class DeleteStrategy<TEntity, TDto> : IDeleteStrategy<TEntity, TDto>
        where TEntity : BaseModel
        where TDto : BaseDto
    {
        public async Task<bool> DeleteAsync(int id, IBaseModelData<TEntity, TDto> repository)
        {
            await repository.DeleteAsync(id);
            return true;
        }
    }
}
