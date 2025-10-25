import { Sequelize } from "sequelize";

// Initialize Sequelize with SQLite
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: console.log, // Set to false to disable SQL query logging
  define: {
    timestamps: true,
    underscored: false,
  },
});

export default sequelize;