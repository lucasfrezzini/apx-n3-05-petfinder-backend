import { Pet, User } from "../models/index.js";
import { Op } from "sequelize";
import { getNearInAlgolia, uploadToAlgolia } from "../lib/algolia.js";
import { uploadProfilePic } from "../lib/cloudinary.js";

export class PetController {
  public static async findOne(id: number) {
    return await Pet.findByPk(id);
  }

  public static async findAll() {
    return await Pet.findAll();
  }

  public static async findAllNear(lat: number, lng: number) {
    const petsNear = await getNearInAlgolia(lat, lng);

    const makeSeqQuery = petsNear.hits.map((pet) => {
      return {
        id: pet.objectID,
        status: "lost",
      };
    });

    return Pet.findAll({
      where: {
        [Op.or]: makeSeqQuery,
      },
    });
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
      const uploadResultURL = await uploadProfilePic(dataURI);
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
        imageURL: uploadResultURL.url,
        imageAssetID: uploadResultURL.asset_id,
        UserId: userId,
      });

      await uploadToAlgolia(
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
