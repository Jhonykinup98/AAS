import { useState } from "react";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
function App() {
  const [logado, setLogado] = useState(false);

  if (logado) return <Home />;
  return <Login onLogin={() => setLogado(true)} />;
}

export default App;