import "./userPage.css";
import { useState } from "react";
import ApiService from "../../services/api";

function UserPage() {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState()
  
  async function handleChangePassword(e) {
    e.preventDefault();

    let errorMessage = "";

    if (!password) {
      errorMessage = "Digite sua senha atual!";
    } else if (!newpassword) {
      errorMessage = "Digite uma nova senha!";
    }
    if (newpassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      await ApiService.changePassword(password, newpassword);
      setError("")
      setSuccess("Senha alterada com sucesso!")
    } catch (error) {
      console.log("Erro ao alterar senha", error)
      setError(error.message)
    }

    
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <header>
          <a href="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </a>

          <h2>Alterar Senha</h2>
        </header>

        <form onSubmit={handleChangePassword}>
          <input
            placeholder="Senha atual"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            placeholder="Nova senha"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newpassword}
          />

          {error && (
            <p
              style={{
                color: "var(--red)",
                fontSize: "1.4rem",
                marginTop: "1.5rem",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              {error}
            </p>
          )}

          {success && (
            <p
              style={{
                color: "var(--blue)",
                fontSize: "1.4rem",
                marginTop: "1.5rem",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              {success}
            </p>
          )}

          <button type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default UserPage;
