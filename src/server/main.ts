import express from "express";
import cors from "cors";
import ViteExpress from "vite-express";
import "dotenv/config";
const PORT = parseInt(process.env.PORT as string) || 3000;

import { Pet, User } from "./models/index.js";
import { Auth } from "./models/authModel.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { authRoutes } from "./routes/authRoutes.js";

// Auth.sync({ force: true });
// User.sync({ force: true });
// Pet.sync({ force: true });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.use(errorMiddleware);

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000...")
);
