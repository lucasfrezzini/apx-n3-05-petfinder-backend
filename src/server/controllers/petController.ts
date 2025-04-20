import { Pet, User, Report } from "../models/index.js";
import { Op } from "sequelize";
import {
  getNearInAlgolia,
  uploadToAlgolia,
  updateInAlgolia,
} from "../lib/algolia.js";
import { destroyPetsPics, uploadPetsPics } from "../lib/cloudinary.js";

export class PetController {
  public static async findOne(id: number) {
    return await Pet.findByPk(id);
  }

  public static async findAll() {
    return await Pet.findAll({
      where: {
        status: "lost",
      },
    });
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

  public static async findPetWithReports(id: number) {
    return await Pet.findByPk(id, {
      include: [
        {
          model: Report,
          separate: true, // Para que el orden funcione correctamente
          order: [["createdAt", "DESC"]],
        },
      ],
    });
  }

  public static async createPetReport(
    data: { [key: string]: string | boolean | string[] },
    userId: number
  ) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const arrDataURI = data["arrDataURI"] as string[];
      const uploadArr = await uploadPetsPics(arrDataURI);
      if (uploadArr.length === 0) {
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
        description: data.description,
        status: "lost",
        images: uploadArr,
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
    data: { [key: string]: string | boolean | string[] },
    petId: string
  ) {
    try {
      const pet = await Pet.findByPk(petId);
      if (!pet) {
        throw new Error("Pet not found");
      }

      const arrDataURI = data["arrDataURI"] as string[];
      // Guardo el dato actual
      let uploadArr: {
        url: string;
        public_id: string;
      }[] = (pet as any).images as { url: string; public_id: string }[];

      if (arrDataURI) {
        uploadArr = await uploadPetsPics(arrDataURI);
        if (!uploadArr) {
          throw new Error("Failed to upload image");
        }

        // Destruyo si no falla la carga de imagenes nuevas
        await destroyPetsPics(pet.dataValues.images);
      }

      const newData = {
        name: data.name,
        type_pet: data.type_pet,
        age: data.age,
        size: data.size,
        lat: data.lat.toString(),
        lng: data.lng.toString(),
        location: data.location,
        description: data.description,
        images: uploadArr,
      };

      await Pet.update(newData, {
        where: {
          id: petId,
        },
      });

      const _geoloc = {
        lat: parseFloat(newData.lat as string),
        lng: parseFloat(newData.lng as string),
      };

      const petUpdated = await updateInAlgolia(petId, _geoloc);

      if (!petUpdated) {
        throw new Error("Error creating pet report");
      }
      return petUpdated;
    } catch (error) {
      throw error;
    }
  }

  public static async changeStatusPet(id: number) {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      throw new Error("Pet not found");
    }

    if (pet.dataValues.status === "find") {
      return await Pet.update(
        { status: "lost" },
        {
          where: {
            id: id,
          },
        }
      );
    }
    return await Pet.update(
      { status: "find" },
      {
        where: {
          id: id,
        },
      }
    );
  }
}
