import "../Login/login.css";

function Signup() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Cadastro</h2>

        <input placeholder="Email" type="email" />
        <input placeholder="Senha" type="password" />
        <input placeholder="Confirme sua senha" type="password" />

        <button>Cadastrar-se</button>

        <p className="signup">
          Já tem uma conta ? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
