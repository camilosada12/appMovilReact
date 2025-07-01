using System;
using Microsoft.EntityFrameworkCore;
using Entity.Model;

namespace Entity.DataInit
{
    public static class RolUserDataInit
    {
        /// <summary>
        /// Método de extensión para agregar datos semilla para la entidad RolUser.
        /// </summary>
        /// <param name="modelBuilder">Constructor del modelo EF Core.</param>
        public static void SeedRolUser(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RolUser>().HasData(
                new RolUser
                {
                    id = 1,
                    rolid = 1,    // Asumiendo que el rol con id=1 (Ej: Administrador) existe
                    userid = 1,   // Asumiendo que el usuario con id=1 (Ej: admin) existe
                    isdeleted = false
                },
                new RolUser
                {
                    id = 2,
                    rolid = 2,    // Rol Usuario
                    userid = 2,   // Usuario normal
                    isdeleted = false
                }
            );
        }
    }
}
