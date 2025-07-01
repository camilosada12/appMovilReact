using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entity.Model;

namespace Entity.relacionesModel
{
    public class RelacionPermission : IEntityTypeConfiguration<Permission>
    {
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            // Configura la tabla y el esquema
            builder.ToTable("permission", schema: "ModelSecurity");

            // Clave primaria
            builder.HasKey(p => p.id);

            // Propiedades con restricciones
            builder.Property(p => p.name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.description)
                   .HasMaxLength(250);

            builder.Property(p => p.active)
                   .IsRequired();

            builder.Property(p => p.isdeleted)
                   .IsRequired();

            // Relación uno a muchos con RolFormPermission
            builder.HasMany(p => p.RolFormPermission)
                   .WithOne(rfp => rfp.Permission)
                   .HasForeignKey(rfp => rfp.permissionid)
                   .OnDelete(DeleteBehavior.Restrict) // Evita borrado en cascada
                   .HasConstraintName("FK_Permission_RolFormPermission");
        }
    }
}
