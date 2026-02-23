import "./usersTable.css";
import ApiService from "../../services/api.js";
import { useState } from "react";

function UsersTable({ users, refreshUsers }) {
  const [error, setError] = useState("");
  const [loadingUserId, setLoadingUserId] = useState(null);

  async function AdminAction(userId, currentActive) {
    try {
      setLoadingUserId(userId);
      await ApiService.handleUser(userId);
    } catch (error) {
      console.log(
        `Falha ao ${currentActive ? "inativar" : "ativar"} o usuário`,
      );
      setError(`Erro ao ${currentActive ? "inativar" : "ativar"} o usuário`);
    } finally {
      setLoadingUserId(null);
      setError("");
      refreshUsers()
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
              <button
                onClick={() => AdminAction(user.id, user.active)}
                disabled={loadingUserId === user.id}
              >
                {loadingUserId === user.id
                  ? "Processando"
                  : user.active
                    ? "inativar usuário"
                    : " reativar usuário"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;
