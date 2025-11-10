import "./home.css";
import { useState } from "react";
import ApiService from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [input, setInput] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const findRoom = async (e) => {
    e.preventDefault();

    const roomId = input;

    if (!roomId) {
      setError("Por favor, insira um código válido");
      return;
    }
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="home">
      <header>
        <Link to={"/"}>
          <img src="/images/logo.svg" alt="Rocket.q logo" id="logo" />
        </Link>
      </header>
      <div id="bg">
        <div className="ball top"></div>
        <div className="ball bottom"></div>
      </div>
      <main>
        <div className="container">
          <section>
            <h2>Entre como participante</h2>
            <form onSubmit={findRoom}>
              <label htmlFor="room-id" className="sr-only">
                Código da sala
              </label>
              <input
                name="roomId"
                type="number"
                id="room-id"
                placeholder="Código da sala"
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />

              {error && (
                <p
                  style={{
                    color: "var(--red)",
                    fontSize: "1.4rem",
                    marginBottom: "1rem",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading}>
                <img src="/images/enter-room.svg" alt="Entar na Sala" />
                {loading ? "Entrando..." : "Entrar na Sala"}
              </button>
            </form>

            <div className="separator">
              <div></div>
              <div>ou</div>
              <div></div>
            </div>
          </section>
          <section>
            <h2>Crie sua própria sala, de forma fácil</h2>
            <a href="/create-pass" className="button outlined">
              <img src="/images/users.svg" alt="Criar Sala" />
              Criar Sala
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
