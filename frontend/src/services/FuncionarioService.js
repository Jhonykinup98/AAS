const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export async function listarFuncionarios() {
  const res = await fetch(`${API_URL}/funcionarios`);
  if (!res.ok) throw new Error("Erro ao buscar funcionários.");
  return res.json();
}

export async function cadastrarFuncionario(dados) {
  const res = await fetch(`${API_URL}/funcionarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar funcionário.");
}

export async function editarFuncionario(id, dados) {
  const res = await fetch(`${API_URL}/funcionarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...dados }),
  });
  if (!res.ok) throw new Error("Erro ao editar funcionário.");
}

export async function deletarFuncionario(id) {
  const res = await fetch(`${API_URL}/funcionarios/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar funcionário.");
}

export async function demitirFuncionario(id) {
  const dataBrasilia = new Date().toLocaleString("sv-SE", {
    timeZone: "America/Sao_Paulo",
  }).replace(" ", "T");

  const res = await fetch(`${API_URL}/funcionarios/${id}/demitir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataBrasilia),
  });
  if (!res.ok) throw new Error("Erro ao demitir funcionário.");
}