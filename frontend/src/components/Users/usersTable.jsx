import { Table, Button } from "@chakra-ui/react";
import ApiService from "../../services/api.js";
import { useState } from "react";
import {HeaderCell, TableCell, TableRow} from "../ui/tableElements.jsx";


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
      refreshUsers();
    }
  }

  return (
    <Table.Root size="lg">
      <Table.Caption/>
      <Table.Header>
        <TableRow>
          <HeaderCell>Email</HeaderCell>
          <HeaderCell>Acesso</HeaderCell>
          <HeaderCell>Id</HeaderCell>
          <HeaderCell>Controle</HeaderCell>
        </TableRow>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              <Button
                onClick={() => AdminAction(user.id, user.active)}
                disabled={loadingUserId === user.id}
                height={10}
                p={3}
              >
                {loadingUserId === user.id
                  ? "Processando"
                  : user.active
                    ? "inativar usuário"
                    : " reativar usuário"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default UsersTable;
