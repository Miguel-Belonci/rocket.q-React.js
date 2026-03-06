import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Apiservice from "../../services/api.js";
import UsersTable from "../../components/Users/usersTable.jsx";
import { Box, Heading } from "@chakra-ui/react";
function UsersList() {
  const [users, Setusers] = useState([]);
  const [error, setError] = useState("");

  async function getUsers() {
    const response = await Apiservice.getUsers();
    Setusers(response.users);
  }

  useEffect(() => {
    try {
      getUsers();
    } catch (error) {
      console.log("Erro ao encontar lista de usuários", error);
      setError(error.message);
    }
  }, []);

  return (
    <Box p={8}>
      <Box
        as={"header"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={"20"}
      >
        <Link to={"/"}>
          <img src="/images/logo.svg" alt="Rocket.q logo" id="logo" />
        </Link>
        <Heading marginLeft={"65rem"} size={"5xl"}>
          Lista de usuários
        </Heading>
      </Box>
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
    </Box>
  );
}

export default UsersList;
