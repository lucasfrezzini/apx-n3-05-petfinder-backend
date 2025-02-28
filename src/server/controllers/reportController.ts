import { Pet, User, Report } from "../models/index.js";
import { sendEmailByResend } from "../lib/resend.js";

interface SeenReport {
  name: string;
  phone: string;
  moreInfo: string;
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
    const subject = `Reporte de Mascota - ${pet.name} by TanoPet FinderApp`;
    const htmlString = `
    <img src="${pet.imageURL}" width="200px"/>
    <h2>Tenemos informacion de ${pet.name}</h2>
    <h3>Informacion proporcionada</h3>
    <p>${data.moreInfo}</p>
    <h3>Informacion de contacto</h3>
    <h4>Nombre: ${data.name}</h4>
    <h4>Telefono: ${data.phone}</h4>
    `;

    sendEmailByResend(data.name, user.email, subject, htmlString);
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
        info: data.moreInfo,
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
