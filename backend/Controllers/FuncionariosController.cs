using Microsoft.AspNetCore.Mvc;
using backend.Application.DTOs;
using backend.Application.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FuncionariosController : ControllerBase
{
    private readonly FuncionarioService _service;

    public FuncionariosController(FuncionarioService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var lista = await _service.ListarAtivosAsync();
        return Ok(lista);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var funcionario = await _service.BuscarPorIdAsync(id);
        if (funcionario is null) return NotFound();
        return Ok(funcionario);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CriarFuncionarioDto dto)
    {
        await _service.CriarAsync(dto);
        return Ok(new { mensagem = "Funcionário cadastrado." });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CriarFuncionarioDto dto)
    {
        await _service.AtualizarAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeletarAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/demitir")]
    public async Task<IActionResult> Demitir(int id, [FromBody] DateTime dataDemissao)
    {
        await _service.DemitirAsync(id, dataDemissao);
        return Ok(new { mensagem = "Funcionário demitido." });
    }
}