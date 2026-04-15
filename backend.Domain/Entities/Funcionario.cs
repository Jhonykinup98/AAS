namespace backend.Domain.Entities;

public class Funcionario
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Matricula { get; set; } = string.Empty;
    public DateTime Admissao { get; set; }
    public DateTime Nascimento { get; set; }
    public string Area { get; set; } = string.Empty;
    public bool Demitido { get; set; } = false;
}