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
    public class RelacionForm : IEntityTypeConfiguration<Form>
    {
        public void Configure(EntityTypeBuilder<Form> builder)
        {
            // Tabla (opcional)
            builder.ToTable("form", schema: "ModelSecurity");

            // Clave primaria
            builder.HasKey(f => f.id);

            // Propiedades básicas
            builder.Property(f => f.name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(f => f.description)
                   .HasMaxLength(250);

            builder.Property(f => f.active)
                   .IsRequired();

            builder.Property(f => f.isdeleted)
                   .IsRequired();

            // Relación: Form -> FormModules (uno a muchos)
            builder.HasMany(f => f.FormModules)
                   .WithOne(fm => fm.Form) // asumiendo que FormModule tiene propiedad Form
                   .HasForeignKey(fm => fm.formid) // asumiendo fk
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Form_FormModules");

            // Relación: Form -> RolFormPermission (uno a muchos)
            builder.HasMany(f => f.RolFormPermission)
                   .WithOne(rfp => rfp.Form) // asumiendo que RolFormPermission tiene propiedad Form
                   .HasForeignKey(rfp => rfp.formid) // asumiendo fk
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Form_RolFormPermission");
        }
    }
}
