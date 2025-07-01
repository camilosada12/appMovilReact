using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entity.Model;

namespace Entity.relacionesModel
{
    public class RelacionRolUser : IEntityTypeConfiguration<RolUser>
    {
        public void Configure(EntityTypeBuilder<RolUser> builder)
        {
            // Definición de tabla y esquema
            builder.ToTable("roluser", schema: "ModelSecurity");

            // Clave primaria
            builder.HasKey(ru => ru.id);

            // Propiedad requerida
            builder.Property(ru => ru.isdeleted)
                   .IsRequired();

            // Relación muchos a uno con Rol
            builder.HasOne(ru => ru.Rol)
                   .WithMany(r => r.RolUser)  // Debe existir la colección RolUser en la entidad Rol
                   .HasForeignKey(ru => ru.rolid)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_RolUser_Rol");

            // Relación muchos a uno con User
            builder.HasOne(ru => ru.User)
                   .WithMany(u => u.Roles)  // Debe existir la colección Roles en la entidad User
                   .HasForeignKey(ru => ru.userid)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_RolUser_User");
        }
    }
}
