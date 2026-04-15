using backend.Domain.Entities;

namespace backend.Domain.Interfaces;

public interface IFuncionarioRepository
{
    Task<IEnumerable<Funcionario>> GetAllAtivosAsync();
    Task<Funcionario?> GetByIdAsync(int id);
    Task AddAsync(Funcionario funcionario);
    Task UpdateAsync(Funcionario funcionario);
    Task DeleteAsync(Funcionario funcionario);
    Task DemitirAsync(int id, DateTime dataDemissao);
}