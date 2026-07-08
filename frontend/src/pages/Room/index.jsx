import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/modal";
import QuestionCards from "../../components/Question-cards/questions";
import ApiService from "../../services/api";
import UserMenu from "../../components/Menu/userMenu";
import "./room.css";

function Room() {
  // FECHA A MODAL
  const [textArea, setTextArea] = useState("");
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal(type, questionId) {
    setIsModalOpen(true);
    setModalType(type);
    setQuestionId(questionId);
  }

  // DEFINE SE A QUESTÃO FOI LIDA OU NÃO
  function markedAsRead(questionId) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, isAnswered: true } : q)),
    );
  }

  // Exclui uma pergunta

  function removeQuestion(questionId) {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  }

  // Monta a tela da room e trás as perguntas
  const { code } = useParams();
  const questionTitle = textArea.trim();

  useEffect(() => {
    async function fectchData() {
      setLoading(true);
      try {
        const response = await ApiService.enterRoom(code);
        setQuestions(response.questions);
      } catch (error) {
        console.log("Erro ao rendenizar a sala", error);
        navigate("/room/error");
      } finally {
        setLoading(false);
      }
    }

    fectchData();
  }, [code, navigate]);

  // Cria questões
  const handleQuestionContent = async (e) => {
    e.preventDefault();

    if (!questionTitle) {
      setError("Por favor, digite sua pergunta");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await ApiService.createQuestion(questionTitle, code);
      setQuestions((prevQuestions) => [...prevQuestions, response.question]);
      setTextArea("");
    } catch (error) {
      console.log("Error create question", error);
      setError(error.message || "Erro ao criar a questão");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="loading-screen">Carregando...</div>
  ) : (
    <>
      <div id="room">
        <header>
  <a href="/" id="logo">
    <img src="/images/logo.svg" alt="Rocket-Q logo" />
  </a>

  <div className="header-actions">
    <div className="buttons">
      <div
        onClick={() => navigator.clipboard.writeText(code)}
        className="button outlined"
        id="room-id"
        data-id={code}
      >
        {code}
        <img src="/images/copy.svg" alt="Copiar número da sala" />
      </div>

      <a href="/create-pass" className="button">
        <img src="/images/users-white.svg" alt="Criar uma sala" />
        Criar Sala
      </a>

      <button
        onClick={() => openModal("delete-room")}
        type="submit"
        className="delete-button"
      >
        Excluir Sala
      </button>
    </div>

    <UserMenu />
  </div>
</header>

        <main id="question-form">
          <section>
            <h2>Faça sua pergunta</h2>
            <form onSubmit={handleQuestionContent}>
              <label htmlFor="question" className="sr-only">
                O que você quer perguntar?
              </label>
              <textarea
                name="question"
                id="question"
                placeholder="O que você quer perguntar ?"
                onChange={(e) => setTextArea(e.target.value)}
                disabled={loading}
                value={textArea}
              ></textarea>

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
          {questions.length === 0 ? (
            <div className="no-questions">
              <img src="/images/chat.svg" alt="sem perguntas" />
              <p>Nenhuma pergunta por aqui...</p>
              <p>
                Faça a primeira pergunda e envie o <br />
                código da sala para outras pessoas!
              </p>
            </div>
          ) : (
            questions.map((question) => (
              <QuestionCards
                openModal={openModal}
                question={question}
                key={question.id}
                isRead={question.isAnswered}
              />
            ))
          )}
        </main>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalType={modalType}
        markedAsRead={markedAsRead}
        removeQuestion={removeQuestion}
        questionId={questionId}
        roomCode={code}
      />
    </>
  );
}

export default Room;
