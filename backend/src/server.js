import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

// Initialize database and start server
export const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync database (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Frontend should connect to: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();
