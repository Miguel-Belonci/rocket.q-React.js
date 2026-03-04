import "./usersTable.css";
import { Table, Button } from "@chakra-ui/react";
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
      refreshUsers();
    }
  }

  return (
    <Table.Root size="lg">
      <Table.Caption />
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader fontSize={"3xl"}>Email</Table.ColumnHeader>
          <Table.ColumnHeader fontSize={"3xl"}>Acesso</Table.ColumnHeader>
          <Table.ColumnHeader fontSize={"3xl"}>Id</Table.ColumnHeader>
          <Table.ColumnHeader fontSize={"3xl"}>Controle</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row>
            <Table.Cell fontSize={"2xl"}>{user.email}</Table.Cell>
            <Table.Cell fontSize={"2xl"}>{user.role}</Table.Cell>
            <Table.Cell fontSize={"2xl"}>{user.id}</Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => AdminAction(user.id, user.active)}
                disabled={loadingUserId === user.id}
              >
                {loadingUserId === user.id
                  ? "Processando"
                  : user.active
                    ? "inativar usuário"
                    : " reativar usuário"}
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default UsersTable;
