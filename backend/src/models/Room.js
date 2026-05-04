import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from "bcryptjs";

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "rooms",
    hooks: {
      beforeCreate: async (room) => {
        if (room.password) {
          const salt = await bcrypt.genSalt(10);
          room.password = await bcrypt.hash(room.password, salt);
        }
      },
    },
  }
);

// Instance method to check password
Room.prototype.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default Room;
