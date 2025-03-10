// Desc: Pet routes for the express server

import express, { NextFunction, Request, Response } from "express";
export const petRoutes = express.Router();
import { PetController } from "../controllers/petController.js";
import { tokenValidatorMiddleware } from "../middlewares/tokenValidatorMiddleware.js";

// Get all pets reports
petRoutes.get(
  "/pets",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const pets = await PetController.findAll();
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
);

petRoutes.post(
  "/pets/near",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userLat, userLng } = req.body;

      const pets = await PetController.findAllNear(
        parseFloat(userLat),
        parseFloat(userLng)
      );
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
);

petRoutes.put(
  "/pets/data",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, id } = req.body;

      const pets = await PetController.updatePetReport(data, id);
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
);

petRoutes.post(
  "/pets/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const pets = await PetController.findOne(id);
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
);

// Post a pet report by id user
petRoutes.post(
  "/pets",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
