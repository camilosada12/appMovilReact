using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entity.Model;

namespace Entity.relacionesModel
{
    public class RelacionRolFormPermission : IEntityTypeConfiguration<RolFormPermission>
    {
        public void Configure(EntityTypeBuilder<RolFormPermission> builder)
        {
            // Tabla y esquema
            builder.ToTable("rolformpermission", schema: "ModelSecurity");

            // Clave primaria
            builder.HasKey(rfp => rfp.id);

            // Propiedades
            builder.Property(rfp => rfp.isdeleted)
                   .IsRequired();

            // Relación muchos a uno con Rol
            builder.HasOne(rfp => rfp.Rol)
                   .WithMany(r => r.RolFormPermission)
                   .HasForeignKey(rfp => rfp.rolid)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_RolFormPermission_Rol");

            // Relación muchos a uno con Form
            builder.HasOne(rfp => rfp.Form)
                   .WithMany(f => f.RolFormPermission)
                   .HasForeignKey(rfp => rfp.formid)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_RolFormPermission_Form");

            // Relación muchos a uno con Permission
            builder.HasOne(rfp => rfp.Permission)
                   .WithMany(p => p.RolFormPermission)
                   .HasForeignKey(rfp => rfp.permissionid)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_RolFormPermission_Permission");
        }
    }
}
