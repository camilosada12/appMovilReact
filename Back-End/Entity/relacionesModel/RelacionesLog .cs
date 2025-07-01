using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.relacionesModel
{
    public class RelacionesLog : IEntityTypeConfiguration<Log>
    {
        public void Configure(EntityTypeBuilder<Log> builder)
        {
            // Define la tabla y esquema
            builder.ToTable("Log", schema: "Logs");

            // Define la clave primaria
            builder.HasKey(l => l.id);

            // Configura las propiedades con sus restricciones
            builder.Property(l => l.Message)
                   .IsRequired()
                   .HasMaxLength(1000);

            builder.Property(l => l.Level)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(l => l.Source)
                   .HasMaxLength(100);

            builder.Property(l => l.StackTrace)
                   .HasMaxLength(4000);

            builder.Property(l => l.UserName)
                   .HasMaxLength(100);
        }
    }
}
