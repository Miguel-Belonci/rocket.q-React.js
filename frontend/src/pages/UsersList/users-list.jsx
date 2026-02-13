import { useState } from "react";
import "./users-list.css";
import Apiservice from "../../services/api.js";
function UsersList() {
  const [users, Setusers] = useState();
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState();

  async function getUsers() {
    const response = await Apiservice.getUsers();
    Setusers(response.users);
  }
  return (
    <div className="admin-page">
      <div className="admin-container"></div>
    </div>
  );
}

export default UsersList;
