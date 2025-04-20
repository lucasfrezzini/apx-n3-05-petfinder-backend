import { Pet, User, Report } from "../models/index.js";
import { sendEmailByResend } from "../lib/resend.js";
import { getHTMLString } from "../utils/emailTemplate.js";

interface SeenReport {
  name: string;
  phone: string;
  info: string;
}

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

export class ReportController {
  public static async createSeenReport(data: SeenReport, petId: number) {
    try {
      const { newSeenReport, user, pet } = await this.saveSeenReport(
        data,
        petId
      );
      await this.sendReportByEmail(data, user, pet);
      return newSeenReport;
    } catch (error) {
      throw error;
    }
  }

  static async sendReportByEmail(data: SeenReport, user: any, pet: any) {
    const subject = `Alerta de ${pet.name}`;

    sendEmailByResend(
      "Pet Rescue by Tano",
      user.email,
      subject,
      getHTMLString(
        pet.name,
        user.name || user.email,
        data.name,
        data.phone,
        data.info
      )
    );
  }

  static async saveSeenReport(data: SeenReport, petId: number) {
    try {
      const pet = await Pet.findByPk(petId);
      if (!pet) {
        throw new Error("Pet not found");
      }

      const user = await User.findByPk(pet.dataValues.UserId);
      if (!user) {
        throw new Error("User not found");
      }

      const newSeenReport = await Report.create({
        name: data.name,
        phone: data.phone,
        info: data.info,
        PetId: petId,
      });

      if (!newSeenReport) {
        throw new Error("Error creating pet report");
      }

      return { newSeenReport, user, pet };
    } catch (error) {
      throw error;
    }
  }
}
