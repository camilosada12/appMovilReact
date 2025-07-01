using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.relacionesModel
{
    public class RelacionPerson : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            // Nombre de la tabla (opcional)
            builder.ToTable("person", schema: "ModelSecurity");

            // Clave primaria
            builder.HasKey(p => p.id);

            // Propiedades básicas
            builder.Property(p => p.firstname)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.lastname)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.phonenumber)
                   .HasMaxLength(20);

            builder.Property(p => p.active)
                   .IsRequired();

            builder.Property(p => p.isdeleted)
                   .IsRequired();

            // Relación: Person -> Users (uno a muchos)
            builder.HasMany(p => p.User)
                   .WithOne(u => u.person)
                   .HasForeignKey(u => u.personid)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Person_User");
        }
    }
}
