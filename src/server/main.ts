import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";
const PORT = parseInt(process.env.PORT as string) || 3000;

import { Pet, User } from "./models/index.js";

User.sync({ force: true });
Pet.sync({ force: true });

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + TypeScript!");
});

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000...")
);
