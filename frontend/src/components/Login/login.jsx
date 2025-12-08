import "./login.css";
import { useState } from "react";

const [inputPassword, setInputPassword] = useState();
const [inputEmail, setInputEmail] = useState();

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <header>
          <a href="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </a>

          <h2>Login</h2>
        </header>

        <input placeholder="Email" type="email" onChange={() => setInputEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" onChange={() => setInputPassword(e.target.value)}/>

        <a href="">Esqueceu a senha?</a>

        <button>Login</button>

        <p className="signup">
          Não tem uma conta ? <a href="/signup">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
