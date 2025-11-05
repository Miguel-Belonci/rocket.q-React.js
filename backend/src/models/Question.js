import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Room from "./Room.js";

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Room,
        key: "id",
      },
    },
    isAnswered: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    tableName: "questions",
  }
);

export default Question;
