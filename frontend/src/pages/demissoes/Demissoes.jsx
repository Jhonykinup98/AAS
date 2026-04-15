import { useEffect, useState } from "react";
import { listarDemissoes } from "../../services/DemissaoService";
import "./Demissoes.css";

export default function Demissoes({ onVoltar }) {
  const [demissoes, setDemissoes] = useState([]);
  const [erro, setErro]           = useState("");

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const data = await listarDemissoes();
      setDemissoes(data);
    } catch {
      setErro("Erro ao carregar demissões.");
    }
  }

  return (
    <div className="demissoes-root">
      <div className="demissoes-header">
        <h2 className="demissoes-title">Demissões</h2>
        <button className="btn-voltar" onClick={onVoltar}>
          ← Voltar para Cadastro
        </button>
      </div>

      {erro && <div className="msg-erro">{erro}</div>}

      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Área</th>
              <th>Nascimento</th>
              <th>Admissão</th>
              <th>Data Demissão</th>
            </tr>
          </thead>
          <tbody>
            {demissoes.length === 0 ? (
              <tr>
                <td colSpan={6} className="tabela-vazia">Nenhum registro de demissão.</td>
              </tr>
            ) : (
              demissoes.map((d) => (
                <tr key={d.id}>
                  <td>{d.nome}</td>
                  <td>{d.matricula}</td>
                  <td>{d.area}</td>
                  <td>{new Date(d.nascimento).toLocaleDateString("pt-BR")}</td>
                  <td>{new Date(d.admissao).toLocaleDateString("pt-BR")}</td>
                  <td>{new Date(d.dataDemissao).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}