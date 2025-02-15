// Desc: Middleware to validate the JWT token

import { NextFunction, Request, Response } from "express";
import { AuthError } from "../utils/customErrors.js";
import jwt from "jsonwebtoken";

export function tokenValidatorMiddleware(
  req: Request & { user_id?: any },
  res: Response,
  next: NextFunction
) {
  try {
    // obtenemos el token enviado desde el front
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AuthError("Token no encontrado");
    }
    // verificamos el token con el secret
    const SECRET_TEXT = process.env.SECRET_TEXT!;

    jwt.verify(token, SECRET_TEXT, function (err: any, data: any) {
      if (err) throw new AuthError("Token inválido");
      req.user_id = data.user_id;
      next();
    });
  } catch (error: any) {
    res.status(401).json({ Error: error.message });
  }
}
