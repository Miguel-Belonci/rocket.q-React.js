import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Apiservice from "../../services/api.js";
import UsersTable from "../../components/Users/usersTable.jsx";
import "../../components/Users/usersTable.css";
function UsersList() {
  const [users, Setusers] = useState([]);
  const [error, setError] = useState("")

  async function getUsers() {
    const response = await Apiservice.getUsers();
    Setusers(response.users);
  }

  useEffect(() => {
    try {
      getUsers();
    } catch (error) {
      console.log("Erro ao encontar lista de usuários", error)
      setError(error.message)
    }
    
  }, []);

  return (
    <div className="table-container">
      <header>
        <Link to={"/"}>
          <img src="/images/logo.svg" alt="Rocket.q logo" id="logo" />
        </Link>
        <h1>Lista de usuários</h1>
      </header>

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

      <UsersTable users={users} refreshUsers={getUsers} />
    </div>
  );
}

export default UsersList;
