const API_URL = import.meta.env.VITE_API_URL ?? "https://localhost:7243/api";

export async function realizarLogin(email, senha) {

  await new Promise((r) => setTimeout(r, 800));
  if (email === "admin@teste.com" && senha === "123456") {
    localStorage.setItem("token", "token-simulado-123");
    return { token: "token-simulado-123", nome: "Admin" };
  }
  throw new Error("E-mail ou senha incorretos.");
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAutenticado() {
  return !!localStorage.getItem("token");
}