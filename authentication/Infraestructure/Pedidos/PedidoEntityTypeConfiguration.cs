using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RobDroneGO.Domain.Pedidos;

namespace RobDroneGO.Infrastructure.Pedidos
{
    internal class PedidoEntityTypeConfiguration : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            //builder.ToTable("Users", SchemaNames.RobDroneGO);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.Name).Property(b => b.Name).HasColumnName("Name").IsRequired();
            //builder.OwnsOne(b => b.Email).Property(b => b.Email).HasColumnName("Email").IsRequired();
            builder.OwnsOne(b => b.Email, userEmailBuilder =>
            {
                userEmailBuilder.Property(e => e.Email).HasColumnName("Email").IsRequired();
                userEmailBuilder.HasIndex(e => e.Email).IsUnique();
            });
            //builder.OwnsOne(b => b.PhoneNumber).Property(b => b.PhoneNumber).HasColumnName("PhoneNumber").IsRequired();
            builder.OwnsOne(b => b.PhoneNumber, phoneNumberBuilder =>
            {
                phoneNumberBuilder.Property(e => e.PhoneNumber).HasColumnName("PhoneNumber").IsRequired();
                phoneNumberBuilder.HasIndex(e => e.PhoneNumber).IsUnique();
            });
            //builder.HasIndex(b => b.PhoneNumber).IsUnique();
            //builder.OwnsOne(b => b.NIF).Property(b => b.NIF).HasColumnName("NIF").IsRequired();
            builder.OwnsOne(b => b.NIF, nifBuilder =>
            {
                nifBuilder.Property(e => e.NIF).HasColumnName("NIF").IsRequired();
                nifBuilder.HasIndex(e => e.NIF).IsUnique();
            });
            builder.OwnsOne(b => b.Password).Property(b => b.Password).HasColumnName("Password").IsRequired();
            //builder.Property(b => b.Estado).HasColumnName("Estado").IsRequired();
            builder.Property(b => b.Estado).HasColumnName("Estado").IsRequired();
            builder.Property(b => b.DataPedido).HasColumnName("DataPedido").IsRequired();
            builder.Property(b => b.DataMudancaEstado).HasColumnName("DataMudancaEstado").IsRequired();
            //builder.OwnsOne(b => b.RoleId).Property(b => b.Role.AsString).HasColumnName("Role").IsRequired();
            //builder.HasOne(b => b.RoleId) .WithMany().HasForeignKey(b => b.RoleId).IsRequired();
        }
    }
}