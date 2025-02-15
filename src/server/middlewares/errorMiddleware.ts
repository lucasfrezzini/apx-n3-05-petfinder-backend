// Desc: Error middleware for the express server
import { Response } from "express";
import * as Errors from "../utils/customErrors.js";

type ErrorTypes =
  | Errors.NotFoundError
  | Errors.ValidationError
  | Errors.AuthError
  | Errors.ConflictError
  | any;

export const errorMiddleware = (err: ErrorTypes, res: Response) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Error interno del servidor";
  const type = err.name || "ServerError";

  console.log(err);
  res.status(statusCode).json({
    success: false,
    statusCode,
    error: {
      message,
      type,
    },
  });
};
