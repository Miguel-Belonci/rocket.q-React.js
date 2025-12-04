import "./login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input placeholder="Email" type="email" />
        <input placeholder="Senha" type="password" />

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
