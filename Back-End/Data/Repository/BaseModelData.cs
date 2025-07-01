using System.Dynamic;
using System.Reflection;
using AutoMapper;
using Data.Repository;
using Entity.Annotations;
using Entity.Context;
using Entity.DTOs;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Utilities.Exeptions;
using Utilities.Helpers;

public class BaseModelData<T, D> : ABaseModelData<T, D> where T : BaseModel where D : BaseDto
{
    protected readonly ApplicationDbContext _context;
    protected readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public BaseModelData(ApplicationDbContext context, IConfiguration configuration, IMapper mapper)
    {
        _context = context;
        _configuration = configuration;
        _mapper = mapper;
    }

    public override async Task<IEnumerable<D>> GetAllAsync()
    {
        try
        {
            var lstModel = await _context.Set<T>().Where(e => !e.isdeleted).ToListAsync();

            List<D> lstDto = new List<D>();
            foreach (var item in lstModel)
            {
                D dto = _mapper.Map<D>(item);
                lstDto.Add(dto);
            }
            return lstDto;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al recuperar datos: {ex.Message}");
            throw;
        }
    }

    public override async Task<IEnumerable<D>> GetDeletedAsync()
    {
        try
        {
            var lstModel = await _context.Set<T>().ToListAsync(); // sin filtros

            List<D> lstDto = new List<D>();
            foreach (var item in lstModel)
            {
                D dto = _mapper.Map<D>(item);
                lstDto.Add(dto);
            }
            return lstDto;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al recuperar datos: {ex.Message}");
            throw;
        }
    }

    public override async Task<T> GetByIdAsync(int id)
    {
        return await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(i => i.id == id);
    }

    public override async Task<T> CreateAsync(T entity)
    {
        try
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (DbUpdateException ex)
        {
            throw new DataIntegrityException("Violación de integridad al crear la entidad", ex);
        }
        catch (Exception ex)
        {
            throw new QueryExecutionException("Error al crear la entidad", ex);
        }
    }

    public override async Task UpdateAsync(T entity)
    {
        try
        {
            var existingEntity = await _context.Set<T>().FindAsync(entity.id);

            if (existingEntity != null)
            {
                _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            }
            else
            {
                _context.Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException ex)
        {
            throw new ConcurrencyException("Conflicto de concurrencia al actualizar", ex);
        }
        catch (Exception ex)
        {
            throw new QueryExecutionException("Error al actualizar la entidad", ex);
        }
    }

    public override async Task<int> DeleteAsync(int id)
    {
        try
        {
            int result = await _context.Set<T>().Where(d => d.id == id).ExecuteDeleteAsync();
            return result;
        }
        catch (Exception ex)
        {
            throw new QueryExecutionException($"Error al eliminar la entidad con ID {id}", ex);
        }
    }

    public override async Task<int> DeleteLogicalAsync(int id)
    {
        try
        {
            T entity = await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(i => i.id == id);
            if (entity == null)
                throw new KeyNotFoundException($"Entidad con ID {id} no encontrada");

            entity.isdeleted = true;
            await UpdateAsync(entity);
            return entity.id;
        }
        catch (Exception ex)
        {
            throw new QueryExecutionException($"Error al eliminar lógicamente la entidad con ID {id}", ex);
        }
    }

    /// <summary>
    /// Reactiva (desmarca como eliminada) una entidad.
    /// </summary>
    /// <param name="id">ID de la entidad.</param>
    /// <returns>True si fue reactivada exitosamente.</returns>
    public override async Task<bool> PatchAsync(int id)
    {
        try
        {
            // Buscar la entidad por ID usando el contexto genérico
            var entity = await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(e => e.id == id);

            // Si no existe la entidad, retornar false
            if (entity == null)
                return false;

            // Marcar como no eliminada
            entity.isdeleted = false;

            // Usar el método UpdateAsync existente para mantener consistencia
            await UpdateAsync(entity);

            return true;
        }
        catch (Exception ex)
        {
            throw new QueryExecutionException($"Error al reactivar la entidad con ID {id}", ex);
        }
    }

    public override async Task<List<ExpandoObject>> GetAllDynamicAsync()
    {
        var entityType = typeof(T);
        var query = _context.Set<T>().AsQueryable();

        var foreignKeyProps = entityType
            .GetProperties()
            .Where(p => Attribute.IsDefined(p, typeof(ForeignIncludeAttribute)))
            .ToList();

        foreach (var prop in foreignKeyProps)
        {
            query = query.Include(prop.Name);
        }

        var resultList = await query.ToListAsync();
        var dynamiclist = new List<ExpandoObject>();

        foreach (var entity in resultList)
        {
            dynamic dyn = new ExpandoObject();
            var dict = (IDictionary<string, object?>)dyn;

            //Id Principal
            dict["id"] = entityType.GetProperty("id")?.GetValue(entity);

            foreach (var prop in foreignKeyProps)
            {
                var attr = prop.GetCustomAttribute<ForeignIncludeAttribute>()!;
                var foreignValue = prop.GetValue(entity);

                if (foreignValue == null) continue;

                if (foreignValue is IEnumerable<object> enumerable && !(foreignValue is string))
                {
                    foreach (var path in attr.SelectPath ?? [])
                    {
                        var list = new List<object?>();
                        foreach (var item in enumerable)
                        {
                            var val = ReflectionHelper.GetNestedPropertyValue(item, path.Split('.'));
                            list.Add(val);
                        }
                        var key = ReflectionHelper.PascalJoin(prop.Name, path);
                        dict[key] = list;
                    }
                }
                else
                {
                    foreach (var path in attr.SelectPath ?? [])
                    {
                        var value = ReflectionHelper.GetNestedPropertyValue(foreignValue, path.Split('.'));
                        var key = ReflectionHelper.PascalJoin(prop.Name, path);
                        dict[key] = value;
                    }
                }

            }


            dynamiclist.Add(dyn);
        }
        return dynamiclist;
    }
}
