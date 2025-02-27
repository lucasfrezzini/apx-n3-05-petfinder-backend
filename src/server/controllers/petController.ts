import { v2 as cloudinary } from "cloudinary";
import { algoliasearch } from "algoliasearch";
import { Pet, User } from "../models/index.js";
import "dotenv/config";

const API_ID = process.env.ALGOLIA_API_ID!;
const API_KEY = process.env.ALGOLIA_API_KEY!;

const client = algoliasearch(API_ID, API_KEY);
const indexName = "pets";

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

  static async uploadToAlgolia(lat: string, lng: string, id: number) {
    const _geoloc = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    // Add record to an index
    const { taskID } = await client.saveObject({
      indexName,
      body: {
        objectID: id,
        _geoloc,
      },
    });

    return taskID;
  }

  public static async findAll() {
    return await Pet.findAll();
  }

  public static async createPetReport(
    data: { [key: string]: string | boolean },
    userId: number
  ) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const dataURI = data["imageDataURI"] as string;
      const uploadResultURL = await this.uploadProfilePic(dataURI);
      if (!uploadResultURL) {
        throw new Error("Failed to upload image");
      }

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

      await this.uploadToAlgolia(
        data.lat as string,
        data.lng as string,
        report.get("id") as number
      );

      if (!report) {
        throw new Error("Error creating pet report");
      }
      return report;
    } catch (error) {
      throw error;
    }
  }
}
