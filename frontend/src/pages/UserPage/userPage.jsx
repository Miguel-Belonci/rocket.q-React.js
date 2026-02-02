import "./userPage.css";
import { useState } from "react";

function UserPage() {

    const [password, setPassword] = useState("");
      const [Newpassword, setNewPassword] = useState("");
      const [error, setError] = useState();

  return (
    <div className="profile-container" >
      <div className="profile-box">
        <header>
          <a href="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </a>

          <h2>Alterar Senha</h2>
        </header>

        <form>
            
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
            value={Newpassword}
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

          <button type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default UserPage;
