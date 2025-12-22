import "./login.css";
import { useState } from "react";
import ApiService from "../../services/api.js"

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("")

async function handleLogin() {
  if (!inputPassword || !inputEmail) {
    setError("Email e senha são obrigatórios")

    const response = await ApiService.auth(email,password)
    if (!response) {
      setError("Não foi possível realizar o login")
    }
  }
}

  return (
    <div className="login-container">
      <div className="login-box">
        <header>
          <a href="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </a>

          <h2>Login</h2>
        </header>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            type="email"
            onChange={() => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Senha"
            type="password"
            onChange={() => setPassword(e.target.value)}
            value={password}
          />

          <a href="">Esqueceu a senha?</a>

          <button type="submit">Login</button>
        </form>

        <p className="signup">
          Não tem uma conta ? <a href="/signup">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
