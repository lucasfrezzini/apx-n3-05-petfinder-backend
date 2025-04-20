// Desc: Auth controller for handling user signup / signin
import { NotFoundError, ValidationError } from "../utils/customErrors.js";
import { User, Auth, Pet, Report } from "../models/index.js";
import bcrypt from "bcrypt";
import { destroyProfilePic, uploadProfilePic } from "../lib/cloudinary.js";

interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: string;
  lat?: string;
  lng?: string;
  profilePic?:
    | {
        url: string;
        public_id: string;
      }
    | string;
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

  static async readyUserData(userData: User, existingData: User) {
    console.log("userData", userData);
    console.log("existingData", existingData);

    let newProfilePic = existingData.profilePic;
    console.log("aca", newProfilePic);

    if (userData.profilePic && userData.profilePic !== "") {
      const resultProfilePic = await uploadProfilePic(
        userData.profilePic as string
      );
      if (!resultProfilePic) {
        throw new Error("Failed to upload image");
      }
      await destroyProfilePic(existingData);
      newProfilePic = { ...resultProfilePic };
    }

    console.log("dsp", newProfilePic);

    // Merger inteligente
    return {
      email: userData.email || existingData.email,
      name: userData.name || existingData.name,
      phone: userData.phone || existingData.phone,
      address: userData.address || existingData.address,
      lat: userData.lat || existingData.lat,
      lng: userData.lng || existingData.lng,
      profilePic: newProfilePic,
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

  // get user pets by id
  public static async getUserPets(id: number) {
    try {
      const pets = await Pet.findAll({
        where: {
          UserId: id,
        },
        order: [["status", "DESC"]],
      });

      if (pets) {
        return pets.map((pet) => pet.dataValues);
      } else {
        throw new NotFoundError();
      }
    } catch (error) {
      throw error;
    }
  }

  // get user reports by id
  public static async getUserPetsWithReports(id: number) {
    try {
      const userWithPetsAndReports = await User.findOne({
        where: { id },
        include: [
          {
            model: Pet,
            include: [
              {
                model: Report,
                separate: true,
                order: [["createdAt", "DESC"]],
              },
            ],
          },
        ],
      });

      if (userWithPetsAndReports) {
        // return pets.map((pet) => pet.dataValues);
        return userWithPetsAndReports.dataValues.Pets;
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
      console.log("userdata", userData);
      const existingData = await User.findByPk(userData.id);

      const readyUserData = await UserController.readyUserData(
        userData,
        existingData?.dataValues
      );
      console.log("readyuserdata", readyUserData);

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
      console.log("Fallo updatePassword");
      throw error;
    }
  }
}
