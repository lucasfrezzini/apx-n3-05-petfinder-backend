// Desc: Error middleware for the express server
import { Response } from "express";

export const errorMiddleware = (err: any, res: Response) => {
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
