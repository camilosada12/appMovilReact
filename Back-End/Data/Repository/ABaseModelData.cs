using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Interfaces;
using Entity.DTOs;
using Entity.Model;

namespace Data.Repository
{
    public abstract class ABaseModelData <T,D> : IBaseModelData<T,D> where T : BaseModel where D : BaseDto
    {
        public abstract Task<IEnumerable<D>> GetAllAsync();
        public abstract Task<T> GetByIdAsync(int id);
        public abstract Task<T> CreateAsync(T entity);
        public abstract Task UpdateAsync(T entity);
        public abstract Task<int> DeleteLogicalAsync(int id);

        public abstract Task<int> DeleteAsync(int id);

        public abstract Task<bool> PatchAsync(int id);

        public abstract Task<IEnumerable<D>> GetDeletedAsync();

        public abstract Task<List<ExpandoObject>> GetAllDynamicAsync();
    }
}
