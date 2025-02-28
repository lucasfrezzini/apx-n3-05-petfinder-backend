import { Pet, User } from "../models/index.js";
import { Op } from "sequelize";
import {
  getNearInAlgolia,
  uploadToAlgolia,
  updateInAlgolia,
} from "../lib/algolia.js";
import { uploadProfilePic, destroyProfilePic } from "../lib/cloudinary.js";

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

  public static async updatePetReport(
    data: { [key: string]: string | boolean },
    petId: string
  ) {
    try {
      const pet = await Pet.findByPk(petId);
      if (!pet) {
        throw new Error("Pet not found");
      }
      console.log(pet);

      const dataURI = data["imageDataURI"] as string;
      let uploadResultURL: any = {};
      uploadResultURL!.url = pet.dataValues.imageURL;
      uploadResultURL!.asset_id = pet.dataValues.imageAssetID;

      console.log(uploadResultURL);

      if (dataURI) {
        uploadResultURL = await uploadProfilePic(dataURI);
        if (!uploadResultURL) {
          throw new Error("Failed to upload image");
        }
        await destroyProfilePic(pet.dataValues.imageAssetID);
      }

      const newData = {
        name: data.name,
        type_pet: data.type_pet,
        age: data.age,
        size: data.size,
        lat: data.lat,
        lng: data.lng,
        location: data.location,
        imageURL: uploadResultURL!.url,
        imageAssetID: uploadResultURL!.asset_id,
      };

      await Pet.update(newData, {
        where: {
          id: petId,
        },
      });

      const petUpdated = await updateInAlgolia(petId, newData);

      if (!petUpdated) {
        throw new Error("Error creating pet report");
      }
      return petUpdated;
    } catch (error) {
      throw error;
    }
  }
}
