using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Entity.Model;
using Microsoft.EntityFrameworkCore;

namespace Entity.DataInit
{
    /// <summary>
    /// Clase estática para inicializar datos semilla (seed) para la entidad <see cref="Person"/>.
    /// </summary>
    public static class PersonDataInit
    {
        /// <summary>
        /// Método de extensión para agregar datos iniciales (seed) a la entidad <see cref="Person"/>.
        /// </summary>
        /// <param name="modelBuilder">Instancia de <see cref="ModelBuilder"/> usada para configurar el modelo de datos.</param>
        public static void seedPerson(this ModelBuilder modelBuilder)
        {
            // Seed para Person
            modelBuilder.Entity<Person>().HasData(
                new Person
                {
                    id = 1,
                    firstname = "Juan",
                    lastname = "Pérez",
                    phonenumber = "1234567890",
                    active = true,
                    isdeleted = false
                },
                new Person
                {
                    id = 2,
                    firstname = "Sara",
                    lastname = "sofia",
                    phonenumber = "312312314",
                    active = true,
                    isdeleted = false
                }
            );
        }
    }
}
