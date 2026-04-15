namespace backend.Application.DTOs;

public class DemissaoDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Matricula { get; set; } = string.Empty;
    public DateTime Nascimento { get; set; }
    public DateTime Admissao { get; set; }
    public string Area { get; set; } = string.Empty;
    public DateTime DataDemissao { get; set; }
}