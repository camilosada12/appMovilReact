using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Threading.Tasks;
using AutoMapper;
using Business.Enums;
using Data;
using Data.Interfaces;
using Data.Services;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Utilities.Exeptions;
using static Dapper.SqlMapper;

namespace Business.Services
{
    /// <summary>
    /// Servicio genérico que implementa operaciones CRUD y otras para manejar DTOs y entidades.
    /// </summary>
    /// <typeparam name="TDto">Tipo del Data Transfer Object.</typeparam>
    /// <typeparam name="TEntity">Tipo de la entidad de la base de datos.</typeparam>
    public class BaseModelBusiness<T, D> : ABaseModelBusiness<T, D> where T : BaseModel where D : BaseDto
    {
        private readonly IBaseModelData<T, D> _data;
        private readonly IMapper _mapper;

        public BaseModelBusiness(IBaseModelData<T, D> data, IMapper mapper)
        {
            _data = data;
            _mapper = mapper;
        }

        public override async Task<bool> DeleteAsync(int id, DeleteMode mode)
        {
            if (id <= 0)
                throw new ValidationException("id", "el id debe ser mayor que cero.");

            IDeleteStrategy<T, D> strategy = mode switch
            {
                DeleteMode.fisico => new DeleteStrategy<T, D>(),
                DeleteMode.Logical => new LogicalDeleteStrategy<T, D>(),
                _ => throw new BusinessException("modo de eliminación no soportado")
            };

            var result = await strategy.DeleteAsync(id, _data);

            if (!result)
                throw new EntityNotFoundException(typeof(T).Name, id);

            return result;
        }

        public override async Task<List<D>> GetAllAsync()
        {
            IEnumerable<D> lstDto = await _data.GetAllAsync();
            return lstDto.ToList();
        }

        public override async Task<List<D>> GetDeletedAsync()
        {
            IEnumerable<D> lstDto = await _data.GetDeletedAsync();
            return lstDto.ToList();
        }

        public override async Task<D> GetByIdAsync(int id)
        {
            T entity = await _data.GetByIdAsync(id);
            D dto = _mapper.Map<D>(entity);
            return dto;
        }

        public override async Task<D> CreateAsync(D dto)
        {
            BaseModel entity = _mapper.Map<T>(dto);
            entity = await _data.CreateAsync((T)entity);
            return _mapper.Map<D>(entity);
        }

        public override async Task UpdateAsync(D dto)
        {
            BaseModel entity = _mapper.Map<T>(dto);
            await _data.UpdateAsync((T)entity);
        }

        public override async Task<bool> PatchAsync(int id)
        {
                bool result = await _data.PatchAsync(id);
                return result;
        }

        /// <summary>
        /// Obtiene una lista dinámica de entidades con relaciones incluidas automáticamente.
        /// </summary>
        /// <returns>Lista de objetos dinámicos con propiedades en PascalCase.</returns>
        public override async Task<List<ExpandoObject>> GetAllDynamicAsync()
        {
            return await _data.GetAllDynamicAsync();
        }

        //public async Task<List<D>> GetDeletedAsync()
        //{
        //    var entities = await _data.get()
        //        .Where(x => x.isDeleted == true)
        //        .ToListAsync();
        //    var dtos = _mapper.Map<List<D>>(entities);
        //    return dtos;
        //}

    }
}
