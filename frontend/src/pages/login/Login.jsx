import { useState } from "react";
import "./Login.css";
import { realizarLogin } from "../../services/LoginService";

export default function Login({ onLogin }) {
  const [email, setEmail]     = useState("");
  const [senha, setSenha]     = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro]       = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      await realizarLogin(email, senha);
      onLogin(); 
    } catch (err) {
      setErro(err.message ?? "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root">
      <div className="login-card">
        <p className="login-tag">Sistema AAS</p>
        <h1 className="login-title">Bem-vindo de volta</h1>
        <p className="login-subtitle">Entre com suas credenciais para continuar</p>

        {erro && <div className="error-msg">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="forgot">
            <a href="#">Esqueceu a senha?</a>
          </div>

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}