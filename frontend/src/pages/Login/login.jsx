import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import "./login.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { signIn, signed } = useContext(AuthContext);

  async function handleLogin(e) {
    e.preventDefault();
    if (!password || !email) {
      setError("Email e senha são obrigatórios");
      return;
    }
    try {
      await signIn(email, password);
    } catch (error) {
      console.log("Falha ao fazer login", error)
      setError(error.message)
    }
    

  }

  if (signed) {
    return <Navigate to="/" />;
  } else {
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
              data-cy="login-email"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              data-cy="login-password"
              placeholder="Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {error && (
              <p
                style={{
                  color: "var(--red)",
                  fontSize: "1.4rem",
                  marginTop: "2rem",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {error}
              </p>
            )}

            <a href="">Esqueceu a senha?</a>

            <button data-cy="login-submit" type="submit">Login</button>
          </form>

          <p className="signup">
            Não tem uma conta ? <a href="/signup">Cadastre-se</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
