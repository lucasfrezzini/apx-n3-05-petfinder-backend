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
      res.status(201).send({ newUser, message: "User created successfully" });
    } catch (error: any) {
      return next(error);
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
      console.log("Token:", typeof token);
      res.status(200).send({ token });
    } catch (error: any) {
      next(error);
    }
  }
);
