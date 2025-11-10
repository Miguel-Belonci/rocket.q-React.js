import "./room.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../components/Modal/modal";
import QuestionCards from "../../components/Question-cards/questions";
import ApiService from "../../services/api";

function Room() {
  // FECHA A MODAL
  const [textArea, setTextArea] = useState("");
  const [error, setError] = useState(false);
  const [isModalOpen, SetisModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [room, setRoom] = useState([]);

  function closeModal() {
    SetisModalOpen(false);
  }

  // ABRE A MODAL E LIDA COM OS TEXTOS DA MODAL

  const [ModalType, SetModalType] = useState(null);

  function openModal(type) {
    SetisModalOpen(true);
    SetModalType(type);
  }

  // DEFINE SE A QUESTÃO FOI LIDA OU NÃO

  const [isRead, SetIsRead] = useState(false);

  function markedAsRead() {
    SetIsRead(true);
  }

  // Monta a tela da room e trás as perguntas

  const { roomId } = useParams();
  const questionTitle = textArea.trim();

  useEffect(() => {
    async function fectchData() {
      setLoading(true);

      try {
        const response = await ApiService.enterRoom(roomId);

        setQuestions(response.questions);
        setRoom(response.room);
      } catch (error) {
        console.log("Erro ao rendenizar a sala", error);
      }
    }

    fectchData();
  }, [roomId]);

  // Cria questões

  const createQuestion = async (e) => {
    e.preventDefault();

    await ApiService.createQuestion(questionTitle, roomId);
  };

  const handleQuestionContent = async (e) => {
    e.preventDefault();

    if (!questionTitle) {
      setError("Por favor, digite sua pergunta");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await ApiService.createQuestion(questionTitle, roomId);
    } catch (error) {
      console.log("Error create question", error);
      setError(error.message || "Erro ao criar a questão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="room">
        <header>
          <a href="/" id="logo">
            <img src="/images/logo.svg" alt="Rocket-Q logo" />
          </a>
          <div className="buttons">
            <div className="button outlined" id="room-id" data-id={roomId}>
              {roomId}
              <img src="/images/copy.svg" alt="Copiar número da sala" />
            </div>
            <a href="/create-pass" className="button">
              <img src="/images/users-white.svg" alt="Criar uma sala" />
              Criar Sala
            </a>
          </div>
        </header>

        <main id="question-form">
          <section>
            <h2>Faça sua pergunta</h2>
            <form onSubmit={handleQuestionContent}>
              <label for="question" className="sr-only">
                O que você quer perguntar?
              </label>
              <textarea
                name="question"
                id="question"
                placeholder="O que você quer perguntar ?"
                onChange={(e) => setTextArea(e.target.value)}
                disabled={loading}
              ></textarea>

              <footer>
                <div>
                  <img src="/images/lock.svg" alt="Cadeado" />
                  Esta pergunta é anônima
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? "Enviando" : "Enviar"}
                </button>
              </footer>
            </form>
          </section>
          <QuestionCards openModal={openModal} isRead={isRead} />
        </main>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        ModalType={ModalType}
        markedAsRead={markedAsRead}
        isRead={isRead}
      />
    </>
  );
}

export default Room;
