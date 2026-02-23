import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Apiservice from "../../services/api.js";
import UsersTable from "../../components/Users/usersTable.jsx";
import "../../components/Users/usersTable.css";
function UsersList() {
  const [users, Setusers] = useState([]);

  async function getUsers() {
    const response = await Apiservice.getUsers();
    Setusers(response.users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="table-container">
      <header>
        <Link to={"/"}>
          <img src="/images/logo.svg" alt="Rocket.q logo" id="logo" />
        </Link>
        <h1>Lista de usuários</h1>
      </header>

      <UsersTable users={users} refreshUsers={getUsers} />
    </div>
  );
}

export default UsersList;
