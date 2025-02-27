// Desc: Auth controller for handling user signup / signin
import { NotFoundError, ValidationError } from "../utils/customErrors.js";
import { User, Auth } from "../models/index.js";
import bcrypt from "bcrypt";

interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: string;
  lat?: string;
  lng?: string;
}

interface UserUpdatePass {
  id: number;
  password: string;
  confirmPassword: string;
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

  // update data user
  public static async updateUser(userData: User) {
    try {
      const readyUserData = UserController.readyUserData(userData);
      await User.update(readyUserData, {
        where: {
          id: userData.id,
        },
      });
      const updateUser = await User.findByPk(userData.id);
      return updateUser?.dataValues;
    } catch (error) {
      console.log("Fallo updateUser");
      throw error;
    }
  }

  // update data user
  public static async updatePassword(userData: UserUpdatePass) {
    try {
      const { password, confirmPassword, id } = userData;
      if (password !== confirmPassword) {
        throw new ValidationError();
      }

      // Save the password in the database updated
      await Auth.update(
        { password: await bcrypt.hash(password, 10) },
        {
          where: {
            user_id: id,
          },
        }
      );

      const updateUser = await User.findByPk(userData.id);

      return updateUser?.dataValues;
    } catch (error) {
      console.log("Fallo updateUser");
      throw error;
    }
  }
}
