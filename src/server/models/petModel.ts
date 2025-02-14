// Desc: Model for the Pet table in the database

import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db/index.js";

export const Pet = sequelize.define("Pet", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type_pet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  distinctive_features: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
