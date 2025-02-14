// Configure the database connection. Postgres by NeonTech DB.

import { Sequelize } from "sequelize";
const DATABASE_URL = process.env.DATABASE_URL as string;

export const sequelize = new Sequelize(DATABASE_URL);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
