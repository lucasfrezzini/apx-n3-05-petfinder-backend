import express from "express";
import cors from "cors";
import ViteExpress from "vite-express";
import "dotenv/config";
const PORT = parseInt(process.env.PORT as string) || 3000;

// import { Pet, User, Report } from "./models/index.js";
// import { Auth } from "./models/authModel.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { petRoutes } from "./routes/petRoutes.js";

// User.sync({ force: true });
// Auth.sync({ force: true });
// Pet.sync({ force: true });
// Report.sync({ force: true });

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", petRoutes);

app.use(errorMiddleware);

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000...")
);
