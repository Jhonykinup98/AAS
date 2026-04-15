using backend.Domain.Entities;

namespace backend.Domain.Interfaces;

public interface IDemissaoRepository
{
    Task<IEnumerable<Demissao>> GetAllAsync();
    Task<Demissao?> GetByIdAsync(int id);
}