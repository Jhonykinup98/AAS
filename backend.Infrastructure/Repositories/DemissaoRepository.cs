using Microsoft.EntityFrameworkCore;
using backend.Domain.Entities;
using backend.Domain.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories;

public class DemissaoRepository : IDemissaoRepository
{
    private readonly AppDbContext _db;

    public DemissaoRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Demissao>> GetAllAsync()
    {
        return await _db.Demissoes.ToListAsync();
    }

    public async Task<Demissao?> GetByIdAsync(int id)
    {
        return await _db.Demissoes.FindAsync(id);
    }
}