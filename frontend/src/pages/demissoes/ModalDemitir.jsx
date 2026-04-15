import "./ModalDemitir.css";

export default function ModalDemitir({ funcionario, onConfirmar, onCancelar }) {
  return (
    <div className="demitir-overlay" onClick={onCancelar}>
      <div className="demitir-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="demitir-titulo">Demitir funcionário</h3>
        <p className="demitir-mensagem">
          Tem certeza que deseja demitir <strong>{funcionario?.nome}</strong>?
        </p>
        <p className="demitir-sub">
          O registro será movido para Demissões com a data e horário atual de Brasília.
        </p>
        <div className="demitir-acoes">
          <button className="btn-nao" onClick={onCancelar}>Não</button>
          <button className="btn-sim" onClick={onConfirmar}>Sim, demitir</button>
        </div>
      </div>
    </div>
  );
}