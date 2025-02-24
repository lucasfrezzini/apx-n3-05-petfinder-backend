// Desc: Report routes for the express server

import express, { NextFunction, Request, Response } from "express";
export const reportRoutes = express.Router();
import { PetController } from "../controllers/petController.js";
import { tokenValidatorMiddleware } from "../middlewares/tokenValidatorMiddleware.js";

// Get all pets reports
reportRoutes.get(
  "/pets",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pets = await PetController.findAll();
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
);

// Post a pet report by id user
reportRoutes.post(
  "/pets",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request body:", req.body);
      const { userId, data } = req.body;
      const petReport = await PetController.createPetReport(
        data,
        parseInt(userId)
      );
      res.status(200).json(petReport);
    } catch (error) {
      next(error);
    }
  }
);
