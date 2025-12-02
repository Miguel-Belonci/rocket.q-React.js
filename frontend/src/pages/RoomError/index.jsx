import "./error.css";
import { useNavigate } from "react-router-dom";

function RoomError() {
  const navigate = useNavigate();
  return (
    
      <div className="error-container">
        <p className="error-message">O código da sala está incorreto</p>
        <button
          className="error-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Voltar a tela inicial
        </button>
      </div>
   
  );
}

export default RoomError;
