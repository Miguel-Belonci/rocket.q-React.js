import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dialect = process.env.DB_DIALECT || "postgres";

const baseConfig = {
  dialect,
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
  },
};

const sequelizeConfig =
  dialect === "sqlite"
    ? {
        ...baseConfig,
        storage: process.env.DB_STORAGE || ":memory:",
      }
    : {
        ...baseConfig,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      };

export const sequelize = new Sequelize(sequelizeConfig);

export default sequelize;
