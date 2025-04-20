// Desc: Profile routes for the express server
import express, { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/userController.js";
import { ValidationError } from "../utils/customErrors.js";
import { tokenValidatorMiddleware } from "../middlewares/tokenValidatorMiddleware.js";

export const userRoutes = express.Router();

// Get user data
userRoutes.get(
  "/user/:id",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.id);
      if (!userId) {
        throw new ValidationError();
      }
      const user = await UserController.userData(userId);
      res.status(200).json(user);
    } catch (error: any) {
      next(error);
    }
  }
);

// Get user id by token
userRoutes.post(
  "/user/id",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.body.email;
      const id = await UserController.getUserId(email);
      res.status(200).json(id);
    } catch (error: any) {
      next(error);
    }
  }
);

// Get user pets by id
userRoutes.post(
  "/user/pets",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body.id;
      const pets = await UserController.getUserPets(parseInt(id));
      res.status(200).json(pets);
    } catch (error: any) {
      next(error);
    }
  }
);

// Get user pets with his reports
userRoutes.post(
  "/user/reports",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body.id;
      const pets = await UserController.getUserPetsWithReports(id);
      res.status(200).json(pets);
    } catch (error: any) {
      next(error);
    }
  }
);

// Update user data
userRoutes.put(
  "/user/data",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("loquellega", req.body);
      const updateUser = await UserController.updateUser(req.body);
      res.status(200).json(updateUser);
    } catch (error: any) {
      next(error);
    }
  }
);

// Update user data
userRoutes.put(
  "/user/pass",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatePassword = await UserController.updatePassword(req.body);
      res.status(200).json(updatePassword);
    } catch (error: any) {
      next(error);
    }
  }
);
