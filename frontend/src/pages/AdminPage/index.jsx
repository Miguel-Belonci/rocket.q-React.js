import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../services/api.js";
import "./adminPage.css";

function AdminPage() {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedUser = useMemo(
    () => users.find((user) => String(user.id) === selectedUserId),
    [selectedUserId, users],
  );

  async function loadRooms(userId = "") {
    const response = await ApiService.getRooms(userId);
    setRooms(response.rooms || []);
  }

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        setError("");

        const [roomsResponse, usersResponse] = await Promise.all([
          ApiService.getRooms(),
          ApiService.getUsers(),
        ]);

        setRooms(roomsResponse.rooms || []);
        setUsers(usersResponse.users || []);
      } catch (error) {
        console.log("Erro ao carregar dados administrativos", error);
        setError(error.message || "Erro ao carregar salas");
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  async function handleUserFilter(event) {
    const userId = event.target.value;
    setSelectedUserId(userId);

    try {
      setLoading(true);
      setError("");
      await loadRooms(userId);
    } catch (error) {
      console.log("Erro ao filtrar salas por usuario", error);
      setError(error.message || "Erro ao filtrar salas");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <Link to="/">
          <img src="/images/logo.svg" alt="Rocket.q logo" />
        </Link>

        <div>
          <span>Painel administrativo</span>
          <h1>Salas criadas</h1>
        </div>
      </header>

      <section className="admin-toolbar" aria-label="Filtros da lista de salas">
        <label htmlFor="user-filter">Filtrar por usuario</label>
        <select
          id="user-filter"
          data-cy="admin-user-filter"
          value={selectedUserId}
          onChange={handleUserFilter}
        >
          <option value="">Todos os usuarios</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </section>

      {error && <p className="admin-message error">{error}</p>}

      <section className="admin-summary" aria-live="polite">
        <strong data-cy="admin-room-count">{rooms.length}</strong>
        <span>
          {selectedUser
            ? `salas criadas por ${selectedUser.email}`
            : "salas encontradas"}
        </span>
      </section>

      <section className="admin-table-wrapper">
        {loading ? (
          <p className="admin-message">Carregando salas...</p>
        ) : rooms.length === 0 ? (
          <p className="admin-message">Nenhuma sala encontrada.</p>
        ) : (
          <table className="admin-table" data-cy="admin-rooms-table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Usuario</th>
                <th>Perguntas</th>
                <th>Criada em</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.code}</td>
                  <td>{room.user?.email || "Usuario nao vinculado"}</td>
                  <td>{room.questions?.length || 0}</td>
                  <td>{formatDate(room.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

export default AdminPage;
