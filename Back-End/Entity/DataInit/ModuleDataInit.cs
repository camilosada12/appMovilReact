using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Entity.DataInit
{
    /// <summary>
    /// Clase estática para inicializar datos semilla (seed) de la entidad <see cref="Module"/>.
    /// </summary>
    public static class ModuleDataInit
    {
        /// <summary>
        /// Método de extensión para agregar datos iniciales (seed) a la entidad <see cref="Module"/>.
        /// </summary>
        /// <param name="modelBuilder">Instancia de <see cref="ModelBuilder"/> usada para configurar el modelo de datos.</param>
        public static void SeedModule(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Module>().HasData(
                new Module
                {
                    id = 1,
                    name = "Módulo Administrativo",
                    description = "Módulo para administración general",
                    active = true,
                    isdeleted = false
                },
                new Module
                {
                    id = 2,
                    name = "Módulo de Reportes",
                    description = "Módulo encargado de generar reportes",
                    active = true,
                    isdeleted = false
                }
            );
        }
    }
}
