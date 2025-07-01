using System;
using Microsoft.EntityFrameworkCore;
using Entity.Model;

namespace Entity.DataInit
{
    /// <summary>
    /// clase estática para inicializar datos semilla (seed) de la entidad <see cref="Permission"/>.
    /// </summary>
    public static class PermissionDataInit
    {
        /// <summary>
        /// método de extensión para agregar datos iniciales (seed) a la entidad <see cref="Permission"/>.
        /// </summary>
        /// <param name="modelBuilder">instancia de <see cref="ModelBuilder"/> usada para configurar el modelo de datos.</param>
        public static void SeedPermission(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Permission>().HasData(
                new Permission
                {
                    id = 1,
                    name = "Leer",
                    description = "permiso para leer formularios",
                    active = true,
                    isdeleted = false
                },
                new Permission
                {
                    id = 2,
                    name = "Crear",
                    description = "permiso para crear formularios",
                    active = true,
                    isdeleted = false
                },
                new Permission
                {
                    id = 3,
                    name = "Editar",
                    description = "permiso para editar formularios",
                    active = true,
                    isdeleted = false
                },
                new Permission
                {
                    id = 4,
                    name = "Eliminar",
                    description = "permiso para eliminar lógicamente formularios",
                    active = true,
                    isdeleted = false
                },
                new Permission
                {
                    id = 5,
                    name = "VerEliminados",
                    description = "permiso para ver formularios eliminados",
                    active = true,
                    isdeleted = false
                },
                new Permission
                {
                    id = 6,
                    name = "Recuperar",
                    description = "permiso para recuperar formularios eliminados",
                    active = true,
                    isdeleted = false
                }
            );
        }
    }
}
