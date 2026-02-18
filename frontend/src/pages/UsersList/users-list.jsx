import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Apiservice from "../../services/api.js";
import UsersTable from "../../components/Users/usersTable.jsx";
function UsersList() {
  const [users, Setusers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await Apiservice.getUsers();
      Setusers(response.users);
    }

    getUsers();
  }, []);

  return (
    <div>
      <header>
        <Link to={"/"}>
          <img src="/images/logo.svg" alt="Rocket.q logo" id="logo" />
        </Link>
        <h1>Lista de usuários</h1>
      </header>

      <UsersTable users={users} />
    </div>
  );
}

export default UsersList;
