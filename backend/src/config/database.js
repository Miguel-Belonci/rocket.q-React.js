import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Initialize Sequelize with PostgeSQL
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
  },
});

export default sequelize;
