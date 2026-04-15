using Microsoft.EntityFrameworkCore;
using backend.Domain.Entities;

namespace backend.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Funcionario> Funcionarios { get; set; }
    public DbSet<Demissao> Demissoes { get; set; }
}