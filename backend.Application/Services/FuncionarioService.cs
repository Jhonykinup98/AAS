using backend.Application.DTOs;
using backend.Domain.Entities;
using backend.Domain.Interfaces;

namespace backend.Application.Services;

public class FuncionarioService
{
    private readonly IFuncionarioRepository _repository;

    public FuncionarioService(IFuncionarioRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<FuncionarioDto>> ListarAtivosAsync()
    {
        var funcionarios = await _repository.GetAllAtivosAsync();
        return funcionarios.Select(f => new FuncionarioDto
        {
            Id = f.Id,
            Nome = f.Nome,
            Matricula = f.Matricula,
            Admissao = f.Admissao,
            Nascimento = f.Nascimento,
            Area = f.Area
        });
    }

    public async Task<FuncionarioDto?> BuscarPorIdAsync(int id)
    {
        var f = await _repository.GetByIdAsync(id);
        if (f is null) return null;
        return new FuncionarioDto
        {
            Id = f.Id,
            Nome = f.Nome,
            Matricula = f.Matricula,
            Admissao = f.Admissao,
            Nascimento = f.Nascimento,
            Area = f.Area
        };
    }

    public async Task CriarAsync(CriarFuncionarioDto dto)
    {
        var funcionario = new Funcionario
        {
            Nome = dto.Nome,
            Matricula = dto.Matricula,
            Admissao = dto.Admissao,
            Nascimento = dto.Nascimento,
            Area = dto.Area,
            Demitido = false
        };
        await _repository.AddAsync(funcionario);
    }

    public async Task AtualizarAsync(int id, CriarFuncionarioDto dto)
    {
        var funcionario = await _repository.GetByIdAsync(id);
        if (funcionario is null) throw new Exception("Funcionário não encontrado.");

        funcionario.Nome = dto.Nome;
        funcionario.Matricula = dto.Matricula;
        funcionario.Admissao = dto.Admissao;
        funcionario.Nascimento = dto.Nascimento;
        funcionario.Area = dto.Area;

        await _repository.UpdateAsync(funcionario);
    }

    public async Task DeletarAsync(int id)
    {
        var funcionario = await _repository.GetByIdAsync(id);
        if (funcionario is null) throw new Exception("Funcionário não encontrado.");
        await _repository.DeleteAsync(funcionario);
    }

    public async Task DemitirAsync(int id, DateTime dataDemissao)
    {
        var funcionario = await _repository.GetByIdAsync(id);
        if (funcionario is null) throw new Exception("Funcionário não encontrado.");
        await _repository.DemitirAsync(id, dataDemissao);
    }
}