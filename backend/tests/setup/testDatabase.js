import { sequelize } from "../../src/config/database.js";
import "../../src/models/index.js";
import Users from "../../src/models/Users.js";

export async function syncDatabase() {
  await sequelize.sync({ force: true });
}

export async function truncateDatabase() {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
}

export async function closeDatabase() {
  await sequelize.close();
}

export async function createUser(overrides = {}) {
  return Users.create({
    email: "student@example.com",
    password: "12345678",
    role: "user",
    active: true,
    ...overrides,
  });
}
