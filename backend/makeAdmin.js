import Users from "./src/models/Users.js";
import sequelize from "./src/config/database.js";

async function makeAdmin() {
  const db = sequelize;
  await db.authenticate();

  const user = await Users.findOne({ where: { email: "admin@gmail.com" } });

  if (!user) {
    console.log("Usuário não encontrado");
    return;
  }

  user.role = "admin";
  await user.save();

  console.log("Admin concedido");
  process.exit();
}

makeAdmin();
