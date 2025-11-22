import { useEffect, useState } from "react";
import ApiService from "../../services/api.js";
import "./modal.css";

function Modal({
  isModalOpen,
  closeModal,
  modalType,
  markedAsRead,
  roomId,
  questionId,
}) {
  const [inputPassword, setInputPassword] = useState();
  const [error, setError] = useState();
  const text = modalType === "check" ? "Marcar como lida" : "Excluir";
  const color = modalType === "check" ? "" : "red";

  async function handleClick(e) {
    e.preventDefault();

    try {
      if (modalType === "check") {
        const pass = inputPassword;

        if (!pass) {
          setError("Por favor Digite sua senha");
          return;
        }

        await ApiService.readQuestion(questionId, pass);

        markedAsRead(questionId);
        closeModal();
      }
    } catch (error) {
      console.log("Erro ao marcar a pergunta como lida", error);
      setError("Senha incorreta");
    }
  }

  useEffect(() => {
    setError("");
    setInputPassword("");
  }, [isModalOpen]);

  return (
    isModalOpen && (
      <div className="modal-wrapper">
        <div className="modal">
          <h2>{`${text} esta pergunta ?`}</h2>
          <p>{`Tem certeza que deseja ${text.toLocaleLowerCase()} esta \n pergunta ?`}</p>

          <form>
            <label htmlFor="password" className="sr-only">
              Digite sua senha admim
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              onChange={(e) => setInputPassword(e.target.value)}
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

            <div className="buttons">
              <div onClick={closeModal} className="button gray cancel">
                Cancelar
              </div>
              <button onClick={handleClick} className={color}>
                {`Sim, ${text.toLocaleLowerCase()}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
