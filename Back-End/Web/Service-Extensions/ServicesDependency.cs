using System.Text.Json.Serialization;
using Business.Services;
using Data.Interfaces;
using Data.Repository;
using Data.Services;
using Entity.DTOs;
using Entity.Model;

namespace Web.Service_Extensions
{
    public static class ServicesDependency
    {
        public static IServiceCollection AddProjectDependencies(this IServiceCollection services)
        {
            // Repositorio genérico
            services.AddScoped(typeof(IBaseModelData<,>), typeof(BaseModelData<,>));

            // Servicios genéricos
            services.AddScoped(typeof(IBaseModelBusiness<Form,FormDto>), typeof(BaseModelBusiness<Form, FormDto>));
            services.AddScoped(typeof(IBaseModelBusiness<FormModule,FormModuleDto>), typeof(BaseModelBusiness<FormModule, FormModuleDto>));
            services.AddScoped(typeof(IBaseModelBusiness<Module,ModuleDto>), typeof(BaseModelBusiness<Module, ModuleDto>));
            services.AddScoped(typeof(IBaseModelBusiness<User,UserDto>), typeof(BaseModelBusiness<User, UserDto>));
            services.AddScoped(typeof(IBaseModelBusiness<RolUser, RolUserDto>), typeof(BaseModelBusiness<RolUser,RolUserDto>));
            services.AddScoped(typeof(IBaseModelBusiness<rol,rolDto>), typeof(BaseModelBusiness<rol, rolDto>));
            services.AddScoped(typeof(IBaseModelBusiness<Person,PersonDto>), typeof(BaseModelBusiness<Person, PersonDto>));
            services.AddScoped(typeof(IBaseModelBusiness<Permission,PermissionDto>), typeof(BaseModelBusiness<Permission, PermissionDto>));
            services.AddScoped(typeof(IBaseModelBusiness<RolFormPermission,RolFormPermissionDto>), typeof(BaseModelBusiness<RolFormPermission, RolFormPermissionDto>));

            // Servicio de logs
            services.AddScoped<LogService>();

            // Configuración para controlar la serialización JSON con conversión de enums a string
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            return services;
        }
    }
}
