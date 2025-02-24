// Desc: Model for the Report table in the database

import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db/index.js";

export const Report = sequelize.define("Report", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  info: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
