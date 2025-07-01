using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entity.Model;

namespace Entity.relacionesModel
{
    public class RelacionModule : IEntityTypeConfiguration<Module>
    {
        public void Configure(EntityTypeBuilder<Module> builder)
        {
            // Configura la tabla y el esquema
            builder.ToTable("module", schema: "ModelSecurity");

            // Clave primaria
            builder.HasKey(m => m.id);

            // Configura las propiedades con restricciones
            builder.Property(m => m.name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(m => m.description)
                   .HasMaxLength(250);

            builder.Property(m => m.active)
                   .IsRequired();

            builder.Property(m => m.isdeleted)
                   .IsRequired();

            // Configura la relación uno a muchos con FormModules
            builder.HasMany(m => m.FormModules)
                   .WithOne(fm => fm.Module)          // Navegación inversa en FormModule
                   .HasForeignKey(fm => fm.moduleid) // Llave foránea en FormModule
                   .OnDelete(DeleteBehavior.Restrict) // Evita eliminación en cascada
                   .HasConstraintName("FK_Module_FormModules");
        }
    }
}
