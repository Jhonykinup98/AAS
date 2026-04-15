using backend.Application.DTOs;
using backend.Domain.Interfaces;

namespace backend.Application.Services;

public class DemissaoService
{
    private readonly IDemissaoRepository _repository;

    public DemissaoService(IDemissaoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<DemissaoDto>> ListarAsync()
    {
        var demissoes = await _repository.GetAllAsync();
        return demissoes.Select(d => new DemissaoDto
        {
            Id = d.Id,
            Nome = d.Nome,
            Matricula = d.Matricula,
            Nascimento = d.Nascimento,
            Admissao = d.Admissao,
            Area = d.Area,
            DataDemissao = d.DataDemissao
        });
    }
}