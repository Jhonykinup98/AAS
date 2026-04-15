using Microsoft.EntityFrameworkCore;
using backend.Domain.Entities;
using backend.Domain.Interfaces;
using backend.Infrastructure.Data;

namespace backend.Infrastructure.Repositories;

public class FuncionarioRepository : IFuncionarioRepository
{
    private readonly AppDbContext _db;

    public FuncionarioRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Funcionario>> GetAllAtivosAsync()
    {
        return await _db.Funcionarios
            .Where(f => !f.Demitido)
            .ToListAsync();
    }

    public async Task<Funcionario?> GetByIdAsync(int id)
    {
        return await _db.Funcionarios.FindAsync(id);
    }

    public async Task AddAsync(Funcionario funcionario)
    {
        _db.Funcionarios.Add(funcionario);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Funcionario funcionario)
    {
        _db.Entry(funcionario).State = EntityState.Modified;
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Funcionario funcionario)
    {
        _db.Funcionarios.Remove(funcionario);
        await _db.SaveChangesAsync();
    }

    public async Task DemitirAsync(int id, DateTime dataDemissao)
    {
        var funcionario = await _db.Funcionarios.FindAsync(id);
        if (funcionario is null) return;

        funcionario.Demitido = true;
        _db.Funcionarios.Update(funcionario);

        var demissao = new Demissao
        {
            Nome = funcionario.Nome,
            Matricula = funcionario.Matricula,
            Nascimento = funcionario.Nascimento,
            Admissao = funcionario.Admissao,
            Area = funcionario.Area,
            DataDemissao = dataDemissao
        };

        _db.Demissoes.Add(demissao);
        await _db.SaveChangesAsync();
    }
}