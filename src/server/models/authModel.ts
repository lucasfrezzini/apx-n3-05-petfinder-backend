// Desc: Model for the Auth table in the database

import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db/index.js";

export const Auth = sequelize.define("Auth", {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
});
