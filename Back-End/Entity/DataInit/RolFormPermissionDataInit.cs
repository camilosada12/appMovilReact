using Microsoft.EntityFrameworkCore;
using Entity.Model;

namespace Entity.DataInit
{
    /// <summary>
    /// Clase estática para inicializar datos semilla para la entidad RolFormPermission.
    /// </summary>
    public static class RolFormPermissionDataInit
    {
        /// <summary>
        /// Método de extensión para agregar datos iniciales (seed) para RolFormPermission.
        /// </summary>
        /// <param name="modelBuilder">El constructor del modelo para configuración.</param>
        public static void SeedRolFormPermission(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RolFormPermission>().HasData(
                // permisos para el rol usuario (rolid = 2)
                new RolFormPermission { id = 1, rolid = 2, formid = 1, permissionid = 1, isdeleted = false }, // leer
                new RolFormPermission { id = 2, rolid = 2, formid = 1, permissionid = 2, isdeleted = false }, // crear
                new RolFormPermission { id = 3, rolid = 2, formid = 1, permissionid = 3, isdeleted = false }, // editar
                new RolFormPermission { id = 4, rolid = 2, formid = 1, permissionid = 4, isdeleted = false }, // eliminar lógico

                // permisos para el rol admin (rolid = 1)
                new RolFormPermission { id = 5, rolid = 1, formid = 1, permissionid = 1, isdeleted = false },
                new RolFormPermission { id = 6, rolid = 1, formid = 1, permissionid = 2, isdeleted = false },
                new RolFormPermission { id = 7, rolid = 1, formid = 1, permissionid = 3, isdeleted = false },
                new RolFormPermission { id = 8, rolid = 1, formid = 1, permissionid = 4, isdeleted = false },
                new RolFormPermission { id = 9, rolid = 1, formid = 1, permissionid = 5, isdeleted = false }, // ver eliminados
                new RolFormPermission { id = 10, rolid = 1, formid = 1, permissionid = 6, isdeleted = false } // recuperar
            );
        }
    }
}
