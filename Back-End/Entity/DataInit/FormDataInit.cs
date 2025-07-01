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
    /// Clase estática para inicializar datos de la entidad <see cref="Form"/>.
    /// </summary>
    public static class FormDataInit
    {
        /// <summary>
        /// Método de extensión para inicializar datos semilla (seed) para la entidad <see cref="Form"/>.
        /// </summary>
        /// <param name="modelBuilder">Instancia de <see cref="ModelBuilder"/> usada para configurar el modelo de datos.</param>
        public static void SeedForm(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Form>().HasData(
                new Form
                {
                    id = 1,
                    name = "Formulario Principal",
                    description = "Formulario principal del sistema",
                    active = true,
                    isdeleted = false
                },
                new Form
                {
                    id = 2,
                    name = "Formulario Secundario",
                    description = "Formulario secundario",
                    active = true,
                    isdeleted = false
                }
            );
        }
    }
}
