import { useState } from "react";
import "./Home.css";
import Usuarios from "../usuarios/Usuarios";
import Demissoes from "../demissoes/Demissoes";


function getSaudacao() {
  const hora = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    hour12: false,
  });
  const h = parseInt(hora);
  if (h >= 1 && h < 13)  return "Tenha um ótimo dia! ☀️";
  if (h >= 13 && h < 18) return "Tenha uma ótima tarde! 🌤️";
  if (h >= 18 && h <= 23) return "Tenha uma ótima noite! 🌙";
  return "Bem-vindo! 👋";
}

export default function Home({ setPagina, pagina }) {
  const [paginaInterna, setPaginaInterna] = useState("home");

  const navegarPara = (p) => setPaginaInterna(p);

  return (
    <div className="home-root">
      <aside className="sidebar">
        <div className="sidebar-logo">AAS</div>
        <nav className="sidebar-nav">
          <a
            href="#"
            className={`nav-item ${paginaInterna === "usuarios" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); navegarPara("usuarios"); }}
          >
            <span className="nav-icon">👤</span>
            Usuários
          </a>
        </nav>
      </aside>

      <main className="home-main">
        {paginaInterna === "home" && (
          <div className="welcome-box">
            <p className="welcome-tag">Sistema</p>
            <h1 className="welcome-title">Bem-vindo ao AAS</h1>
            <p className="welcome-sub">{getSaudacao()}</p>
          </div>
        )}
        {paginaInterna === "usuarios" && (
          <Usuarios onIrParaDemissoes={() => navegarPara("demissoes")} />
        )}
        {paginaInterna === "demissoes" && <Demissoes onVoltar={() => navegarPara("usuarios")} />}
      </main>
    </div>
  );
}