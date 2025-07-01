using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Model;
using Microsoft.EntityFrameworkCore;

namespace Entity.DataInit
{
    /// <summary>
    /// Clase estática para inicializar datos semilla (seed) para la entidad <see cref="Rol"/>.
    /// </summary>
    public static class RolDataInit
    {
        /// <summary>
        /// Método de extensión para agregar datos iniciales (seed) a la entidad <see cref="rol"/>.
        /// </summary>
        /// <param name="modelBuilder">Instancia de <see cref="ModelBuilder"/> usada para configurar el modelo de datos.</param>
        public static void SeedRol(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<rol>().HasData(
                new rol
                {
                    id = 1,
                    name = "Administrador",
                    description = "Rol con todos los permisos",
                    active = true,
                    isdeleted = false
                },
                new rol
                {
                    id = 2,
                    name = "Usuario",
                    description = "Rol estándar para usuarios normales",
                    active = true,
                    isdeleted = false
                }
            );
        }
    }
}
