const API_URL = import.meta.env.VITE_API_URL ?? "/api";

export async function listarDemissoes() {
  const res = await fetch(`${API_URL}/demissoes`);
  if (!res.ok) throw new Error("Erro ao buscar demissões.");
  return res.json();
}