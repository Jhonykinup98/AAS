using backend.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DemissoesController : ControllerBase
{
    private readonly AppDbContext _db;

    public DemissoesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var lista = await _db.Demissoes.ToListAsync();
        return Ok(lista);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var demissao = await _db.Demissoes.FindAsync(id);
        if (demissao is null) return NotFound();
        return Ok(demissao);
    }
}