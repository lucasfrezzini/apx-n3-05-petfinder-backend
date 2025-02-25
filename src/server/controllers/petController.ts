import { v2 as cloudinary } from "cloudinary";
import { Pet, User } from "../models/index.js";
import "dotenv/config";

export class PetController {
  static async uploadProfilePic(dataURI: string) {
    // Upload the profile picture to the cloud
    // Return the URL of the uploaded image
    // Configuration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Upload an image
    try {
      const uploadResult = await cloudinary.uploader.upload(dataURI);
      return uploadResult.url;
    } catch (error) {
      throw error;
    }
  }

  public static async findAll() {
    return await Pet.findAll();
  }

  public static async createPetReport(
    data: { [key: string]: string | boolean },
    userId: number
  ) {
    try {
      const dataURI = data["imageDataURI"] as string;
      const uploadResultURL = await this.uploadProfilePic(dataURI);
      if (!uploadResultURL) {
        throw new Error("Failed to upload image");
      }
      console.log("Image uploaded:", uploadResultURL);
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      console.log("User found:", user);
      const report = await Pet.create({
        name: data.name,
        type_pet: data.type_pet,
        age: data.age,
        size: data.size,
        lat: data.lat,
        lng: data.lng,
        location: data.location,
        status: "lost",
        imageURL: uploadResultURL,
        UserId: userId,
      });

      if (!report) {
        throw new Error("Error creating pet report");
      }
      console.log("Pet report created:", report);
      return report;
    } catch (error) {
      throw error;
    }
  }
}
