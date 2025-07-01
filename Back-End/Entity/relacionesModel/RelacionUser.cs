using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.relacionesModel
{
    public class RelacionUser : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Tabla opcionalmente puedes nombrarla explícitamente
            builder.ToTable("user", schema: "ModelSecurity");

            // Relación: User -> Person (muchos a uno)
            builder.HasOne(u => u.person)
                   .WithMany(p => p.User)
                   .HasForeignKey(u => u.personid)
                   .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Reglas adicionales sobre las columnas si quieres
            builder.Property(u => u.username)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(u => u.email)
                   .HasMaxLength(200);

            builder.Property(u => u.password)
                   .IsRequired()
                   .HasMaxLength(100);
        }
    }
}
