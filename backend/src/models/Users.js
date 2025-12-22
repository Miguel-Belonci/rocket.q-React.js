import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from "bcryptjs";

const Users = sequelize.define(
  "Users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.TEXT, allowNull: false },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
  },
  {
    tableName: "users",
    hooks: {
      beforeCreate: async (users) => {
        if (users.password) {
          const salt = await bcrypt.genSalt(10);
          users.password = await bcrypt.hash(users.password, salt);
        }
      },
    },
  }
);

Users.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export default Users;
