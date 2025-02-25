// Desc: Auth controller for handling user signup / signin

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ConflictError,
  ValidationError,
  NotFoundError,
  AuthError,
} from "../utils/customErrors.js";
import { User } from "../models/index.js";
import { Auth } from "../models/authModel.js";

interface User {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: string;
  lat?: string;
  lng?: string;
  role?: string;
}

export class AuthController {
  // Validate the user data
  static validateUserRequiredData(email: string, password: string) {
    // Validate the user data
    // Return true if the user is valid
    // Return false if the user is invalid
    if (email.length > 0 && password.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  static readyUserData(userData: User) {
    return {
      email: userData.email,
      name: userData.name || "",
      phone: userData.phone || "",
      address: userData.address || "",
      lat: userData.lat || "",
      lng: userData.lng || "",
    };
  }

  // Signup
  public static async signupUser(userData: User) {
    try {
      if (
        !AuthController.validateUserRequiredData(
          userData.email,
          userData.password
        )
      ) {
        throw new ValidationError();
      }

      const readyUserData = AuthController.readyUserData(userData);

      // Create the user if it doesn't exist
      const [user, created] = await User.findOrCreate({
        where: { email: userData.email },
        defaults: readyUserData,
      });

      // Save the password in the database if the user is created
      if (created) {
        await Auth.create({
          email: userData.email,
          password: await bcrypt.hash(userData.password, 10),
          user_id: user.get("id"), // user.id,
        });

        return user.dataValues;
      } else {
        throw new ConflictError();
      }
    } catch (error) {
      throw error;
    }
  }

  // Login
  public static async loginUser(email: string, password: string) {
    try {
      if (!AuthController.validateUserRequiredData(email, password)) {
        throw new ValidationError();
      }

      // Find the user from the data
      const user = await Auth.findOne({
        where: { email: email },
      });
      console.log("User:", user);

      if (!user) {
        console.log("User not found");
        throw new NotFoundError();
      }
      console.log("User found");
      // Check if the password matches the hash
      const userPassword: string = user.get("password") as string;
      const isValid = await bcrypt.compare(password, userPassword);

      console.log("isValid:", isValid);

      // Generate a new token and return it
      if (isValid) {
        const SECRET_TEXT = process.env.SECRET_TEXT!;
        const token = jwt.sign(
          {
            user_id: user.get("id"),
          },
          SECRET_TEXT,
          { expiresIn: "1h" }
        );
        return token;
      } else {
        throw new AuthError("Credenciales inválidas");
      }
    } catch (error) {
      throw error;
    }
  }
}
