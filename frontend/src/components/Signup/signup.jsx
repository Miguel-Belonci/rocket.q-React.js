import "../Login/login.css";
import { useState } from "react";

function Signup() {
  const [inputPassword, setInputPassword] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState();
  const [error, setError] = useState()
  
async function createUser() {
  
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

        <input
          placeholder="Email"
          type="email"
          onChange={() => setInputEmail(e.target.vaule)}
        />
        <input
          placeholder="Senha"
          type="password"
          onChange={() => setInputPassword(e.target.value)}
        />
        <input
          placeholder="Confirme sua senha"
          type="password"
          onChange={() => setInputPasswordConfirm(e.target.value)}
        />

        <button>Cadastrar-se</button>

        <p className="signup">
          Já tem uma conta ? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
