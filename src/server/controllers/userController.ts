// Desc: Auth controller for handling user signup / signin
import { NotFoundError } from "../utils/customErrors.js";
import { User } from "../models/userModel.js";

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

export class UserController {
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

  // get userData
  public static async userData(userId: number) {
    try {
      const user = await User.findByPk(userId);
      console.log("userBack", user);
      if (user) {
        return user;
      } else {
        throw new NotFoundError();
      }
    } catch (error) {
      throw error;
    }
  }

  // get user id by email
  public static async getUserId(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        return user.get("id");
      } else {
        throw new NotFoundError();
      }
    } catch (error) {
      throw error;
    }
  }
}
