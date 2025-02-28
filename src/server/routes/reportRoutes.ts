// Desc: Report routes for the express server

import express, { NextFunction, Request, Response } from "express";
export const reportRoutes = express.Router();
import { ReportController } from "../controllers/reportController.js";
import { tokenValidatorMiddleware } from "../middlewares/tokenValidatorMiddleware.js";

// Save new report and send Email
reportRoutes.post(
  "/report",
  tokenValidatorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, petId } = req.body;

      const petReport = await ReportController.createSeenReport(
        data,
        parseInt(petId)
      );
      res.status(200).json(petReport);
    } catch (error) {
      next(error);
    }
  }
);
