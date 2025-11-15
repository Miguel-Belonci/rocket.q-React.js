import "./questions.css";

function QuestionCards({ openModal, isRead, question }) {

  return (
    <section id="question">
      <h2 className="sr-only">Perguntas da comunidade</h2>
      <div className="questions">
        <div className={`question-wrapper ${isRead ? "read" : ""}`}>
          <div className="question-content">
            <div className="user">
              <img src="/images/1user.svg" alt="Avatar" />
            </div>
            <div className="question">
              <p> {question.title} </p>
            </div>
          </div>

          <div className="actions">
            <a
              href="#"
              className="check"
              data-id=""
              onClick={() => openModal("check", question.id)}
            >
              <img src="/images/check.svg" alt="Marcar como lida" />
              {isRead ? "Pergunta lida" : "Marcar como lida"}
            </a>
            <a
              href="#"
              className="delete"
              data-id=""
              onClick={() => openModal("delete", question.id)}
            >
              <img src="/images/trash.svg" alt="Excluir" />
              Excluir
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionCards;
