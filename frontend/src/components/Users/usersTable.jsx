import "./usersTable.css";
import ApiService from "../../services/api.js";
import { useState } from "react";

function UsersTable({ users }) {
  const [error, setError] = useState("");

  async function AdminAction(UserId, currentActive) {
    try {
      await ApiService.handleUser();
    } catch (error) {
      console.log();
      setError();
    }
  }

  return (
    <table>
      <thead>
        <th>Email</th>
        <th>Acesso</th>
        <th>Id</th>
        <th>Ação</th>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.id}</td>
            <td>
              <button onClick={() => AdminAction(user.id, user.action)}>
                {`${user.active ? "inativar" : "reativar"} usuário`}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;
