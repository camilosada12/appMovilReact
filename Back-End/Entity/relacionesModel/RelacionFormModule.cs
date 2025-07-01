using Entity.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.relacionesModel
{
    public class RelacionFormModule : IEntityTypeConfiguration<FormModule>
    {
        public void Configure(EntityTypeBuilder<FormModule> builder)
        {
            // Configura la tabla y esquema
            builder.ToTable("formmodule", schema: "ModelSecurity");

            // Clave primaria
            builder.HasKey(fm => fm.id);

            // Propiedad requerida
            builder.Property(fm => fm.isdeleted)
                   .IsRequired();

            // Relación muchos a uno con Form
            builder.HasOne(fm => fm.Form)
                   .WithMany(f => f.FormModules)
                   .HasForeignKey(fm => fm.formid)
                   .OnDelete(DeleteBehavior.Restrict)  // Evita borrado en cascada
                   .HasConstraintName("FK_FormModule_Form");

            // Relación muchos a uno con Module
            builder.HasOne(fm => fm.Module)
                   .WithMany(m => m.FormModules)
                   .HasForeignKey(fm => fm.moduleid)
                   .OnDelete(DeleteBehavior.Restrict)  // Evita borrado en cascada
                   .HasConstraintName("FK_FormModule_Module");
        }
    }
}
