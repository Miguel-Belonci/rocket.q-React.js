import "../Login/login.css";
import { useState } from "react";
import Apiservice from "../../services/api";

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState();

  async function handleCreateUser(e) {
    e.preventDefault();

    let errorMessage = "";

    if (!email) {
      errorMessage = "Digite seu email";
    } else if (!password) {
      errorMessage = "Digite sua senha";
    } else if (!passwordConfirm) {
      errorMessage = "Confirme sua senha";
    } else if (password !== passwordConfirm) {
      errorMessage = "As senhas são diferentes, confirme a senha novamente";
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    try {
      await Apiservice.createUser(email, password);
      setError("");
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else{
        setError("Erro inesperado, tente novamente")
      }

      console.log("Erro ao cadastrar-se", error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <header>
          <a href="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </a>

          <h2>Cadastro</h2>
        </header>

        <form onSubmit={handleCreateUser}>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            placeholder="Confirme sua senha"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
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

          <button type="submit">Cadastrar-se</button>
        </form>

        <p className="signup">
          Já tem uma conta ? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
