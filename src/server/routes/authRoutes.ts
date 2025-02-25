// Desc: Auth routes for express server

import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "../controllers/authController.js";
export const authRoutes = express.Router();

// Signup the user
authRoutes.post(
  "/auth",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await AuthController.signupUser(req.body);

      res.status(201).send(newUser);
    } catch (error: any) {
      next(error);
    }
  }
);

// Login the user
authRoutes.post(
  "/auth/token",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await AuthController.loginUser(email, password);
      res.status(200).json(token);
    } catch (error: any) {
      next(error);
    }
  }
);
