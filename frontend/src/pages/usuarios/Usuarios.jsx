import { useEffect, useState } from "react";
import {
  listarFuncionarios,
  cadastrarFuncionario,
  editarFuncionario,
  deletarFuncionario,
  demitirFuncionario,
} from "../../services/FuncionarioService";
import ModalDemitir from "../demissoes/ModalDemitir";
import "./Usuarios.css";

const VAZIO = { nome: "", matricula: "", admissao: "", nascimento: "", area: "" };

export default function Usuarios({ onIrParaDemissoes }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [modal, setModal]               = useState(false);
  const [modalDemitir, setModalDemitir] = useState(false);
  const [selecionado, setSelecionado]   = useState(null);
  const [editando, setEditando]         = useState(null);
  const [form, setForm]                 = useState(VAZIO);
  const [erro, setErro]                 = useState("");
  const [loading, setLoading]           = useState(false);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    try {
      const data = await listarFuncionarios();
      setFuncionarios(data);
    } catch {
      setErro("Erro ao carregar funcionários.");
    }
  }

  function abrirCadastro() {
    setEditando(null);
    setForm(VAZIO);
    setErro("");
    setModal(true);
  }

  function abrirEdicao(f) {
    setEditando(f);
    setForm({
      nome:       f.nome,
      matricula:  f.matricula,
      admissao:   f.admissao.split("T")[0],
      nascimento: f.nascimento.split("T")[0],
      area:       f.area,
    });
    setErro("");
    setModal(true);
  }

  function abrirModalDemitir(f) {
    setSelecionado(f);
    setModalDemitir(true);
  }

  function fecharModal() {
    setModal(false);
    setEditando(null);
    setForm(VAZIO);
    setErro("");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      if (editando) {
        await editarFuncionario(editando.id, form);
      } else {
        await cadastrarFuncionario(form);
      }
      await carregar();
      fecharModal();
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(id) {
    try {
      await deletarFuncionario(id);
      await carregar();
    } catch {
      setErro("Erro ao deletar funcionário.");
    }
  }

  async function handleConfirmarDemissao() {
    try {
      await demitirFuncionario(selecionado.id);
      setModalDemitir(false);
      setSelecionado(null);
      await carregar();
      onIrParaDemissoes();
    } catch {
      setErro("Erro ao demitir funcionário.");
      setModalDemitir(false);
    }
  }

  return (
    <div className="usuarios-root">
      <div className="usuarios-header">
        <h2 className="usuarios-title">Funcionários</h2>
        <div className="header-acoes">
          <button className="btn-demissoes" onClick={onIrParaDemissoes}>
              Demissões
          </button>
          <button className="btn-cadastrar" onClick={abrirCadastro}>
              Cadastrar  +
          </button>
        </div>
      </div>

      {erro && <div className="msg-erro">{erro}</div>}

      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Área</th>
              <th>Admissão</th>
              <th>Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.length === 0 ? (
              <tr>
                <td colSpan={6} className="tabela-vazia">Nenhum funcionário cadastrado.</td>
              </tr>
            ) : (
              funcionarios.map((f) => (
                <tr key={f.id}>
                  <td>{f.nome}</td>
                  <td>{f.matricula}</td>
                  <td>{f.area}</td>
                  <td>{new Date(f.admissao).toLocaleDateString("pt-BR")}</td>
                  <td>{new Date(f.nascimento).toLocaleDateString("pt-BR")}</td>
                  <td className="acoes">
                    <button className="btn-editar" onClick={() => abrirEdicao(f)}>Editar</button>
                    <button className="btn-deletar" onClick={() => abrirModalDemitir(f)}>Demitir</button>
                    <button className="btn-excluir" onClick={() => handleDeletar(f.id)}>Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{editando ? "Editar Funcionário" : "Novo Funcionário"}</h3>
            {erro && <div className="msg-erro">{erro}</div>}
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Nome</label>
                <input name="nome" value={form.nome} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Matrícula</label>
                <input name="matricula" value={form.matricula} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Área</label>
                <input name="area" value={form.area} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Admissão</label>
                <input type="date" name="admissao" value={form.admissao} onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Nascimento</label>
                <input type="date" name="nascimento" value={form.nascimento} onChange={handleChange} required />
              </div>
              <div className="modal-acoes">
                <button type="button" className="btn-cancelar" onClick={fecharModal}>Cancelar</button>
                <button type="submit" className="btn-salvar" disabled={loading}>
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalDemitir && (
        <ModalDemitir
          funcionario={selecionado}
          onConfirmar={handleConfirmarDemissao}
          onCancelar={() => { setModalDemitir(false); setSelecionado(null); }}
        />
      )}
    </div>
  );
}