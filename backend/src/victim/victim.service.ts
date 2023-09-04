import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Not } from "typeorm";
import e from "express";
import { ResponseService } from "../response/response.service";
import { Victim } from "../victim/entity/victim.entity";
import { VictimRegisterDto } from "../victim/register.victim";
import { CategoryUpateDto } from "../victim/update.dto";
import { User } from "../user/user/entity/user.entity";
import { CertificateService } from "../certificates/certificate.service";
import { CertificateRegisterDto } from "../certificates/dto/create.certificate.dto";
import { Category } from "../category/entity/category.entity";
import { UpdateRegisterDto } from "./update.victim.dto";
import * as dotenv from "dotenv";
dotenv.config();
require("dotenv").config();
import * as nodemailer from "nodemailer";

export type Usa = any;
@Injectable()
export class VictimService {
  private readonly transporter;
  constructor(
    private response: ResponseService,
    private certificateService: CertificateService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mugishapacifique1@gmail.com",
        pass: "fmejxpnprdegyqco", // Use your Gmail app password here
      },
    });
  }

  async createVictim(data: VictimRegisterDto) {
    const phonePattern = /^(07[8239])[0-9]{7}$/;
    // Test if the phoneNumber matches the pattern
    if (!phonePattern.test(data.phoneNumber)) {
      throw new BadRequestException(
        "Primary Phone Number must be Airtel or MTN number formatted like 07*********",
      );
    }
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    // Test if the email matches the pattern
    if (!emailPattern.test(data.email)) {
      throw new BadRequestException("Invalid email address");
    }
    const phone = await Victim.findOne({
      where: { phoneNumber: data.phoneNumber },
    });

    if (phone) {
      console.log("phone exist ");
      console.log(phone);
      throw new BadRequestException("Phone number exist in our database");
    }
    const email = await Victim.findOne({ where: { email: data.email } });
    if (email) {
      throw new BadRequestException("Email exist in our database");
    }
    const victim = new Victim();
    const count = await Victim.count();

    // Increment the count by 1 and format it with leading zeros
    const serialNumber = String(count + 1).padStart(7, "0");
    victim.serialNumber = serialNumber;
    victim.firstName = data.firstName;
    victim.lastName = data.lastName;
    victim.dob = data.dob;
    victim.email = data.email;
    victim.phoneNumber = data.phoneNumber;
    victim.status = 2;
    victim.created_by = 1;
    victim.updated_by = 1;
    victim.medicalInsurance = data.medicalInsurance;
    victim.isOrphan = data.isOrphan;
    victim.fatherNames = data.fatherNames;
    victim.motherNames = data.motherNames;
    victim.guardiaNames = data.guardiaNames
    victim.parentContact = data.parentContact;
    victim.parentContact = data.parentContact;
    victim.childDob = data.childDob;
    victim.caseScenario = data.caseScenario;
    victim.siblingNumber = data.siblingNumber;
    victim.educationLevel = data.educationLevel;
    // check if user exist
    const user = await User.findOne({
      where: { id: data.user },
    });
    if (!user)
      throw new BadRequestException(`This user ${data.user} not found`);
    victim.user = user;
    // check if user exist
    if (data.category) {
      const category = await Category.findOne({
        where: { id: data.category },
      });
      if (!category)
        throw new BadRequestException(
          `This category ${data.category} not found`,
        );
      victim.category = category;
    }

    try {
      // Send email
      const info = await this.transporter.sendMail({
        from: "mugishapacifique1@gmail.com",
        to: victim.email,
        subject: "You have registered successfully ",
        text:
          "\n" +
          "\n" +
          "\n" +
          "Dear " +
          victim.firstName +
          "\n" +
          "\n" +
          "You have registered successfully " +
          "You belong to" +
          " " +
          victim.category.cateogryName +
          " category",
      });

      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Email could not be sent");
    }
    try {
      const data = await victim.save();
      await this.certificateService.createCertificate(data.id);

      // const number = "+25" + victim.primaryPhone;
      // const message =
      //   "\n" +
      //   "\n" +
      //   "\n" +
      //   "Dear " +
      //   victim.firstName +
      //   "\n" +
      //   "\n" +
      //   "You have registered successfully " +
      //   "You belong to" +
      //   " " +
      //   victim.category.cateogryName +
      //   " category";
      // const twilio = require("twilio")(process.env.SID, process.env.AUTHTOKEN);
      // await twilio.messages
      //   .create({
      //     from: process.env.TWILIONUMBER,
      //     to: number,
      //     body: message,
      //   })
      //   .then(() => console.log("message has sent"))
      //   .catch((e) => console.log(e));
      return this.response.postResponse(data.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }

  async updateVictim(id: number, data: UpdateRegisterDto) {
    const phonePattern = /^(07[8239])[0-9]{7}$/;
    if (!phonePattern.test(data.phoneNumber)) {
      throw new BadRequestException(
        "Primary Phone Number must be Airtel or MTN number formatted like 07*********",
      );
    }
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    // Test if the email matches the pattern
    if (!emailPattern.test(data.email)) {
      throw new BadRequestException("Invalid email address");
    }

    const victim = await Victim.findOne({
      where: { id },
    });
    if (!victim) throw new BadRequestException(`This victim ${id} not found`);
    victim.firstName = data.firstName;
    victim.lastName = data.lastName;
    victim.dob = data.dob;
    victim.email = data.email;
    victim.phoneNumber = data.phoneNumber;
    victim.status = 2;
    victim.created_by = 1;
    victim.updated_by = 1;
    victim.medicalInsurance = data.medicalInsurance;
    victim.isOrphan = data.isOrphan;
    victim.fatherNames = data.fatherNames;
    victim.motherNames = data.motherNames;
    victim.parentContact = data.parentContact;
    victim.parentContact = data.parentContact;
    victim.childDob = data.childDob;
    victim.caseScenario = data.caseScenario;
    victim.siblingNumber = data.siblingNumber;
    victim.educationLevel = data.educationLevel;
    victim.guardiaNames = victim.guardiaNames;
    
    // check if user exist
    const user = await User.findOne({
      where: { id: data.user },
    });
    if (!user)
      throw new BadRequestException(`This user ${data.user} not found`);
    victim.user = user;
    // check if user exist
    if (data.category) {
      const category = await Category.findOne({
        where: { id: data.category },
      });
      if (!category)
        throw new BadRequestException(
          `This category ${data.category} not found`,
        );
      victim.category = category;
    }

    try {
      const data = await Victim.update(id, victim);
      return this.response.updateResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async getAllByUserVictims(id: number) {
    return Victim.find({
      where: { status: Not(8), user: { id } },
      relations: ["category"],
    });
  }
  async getAllVictims() {
    return Victim.find({ where: { status: Not(8) }, relations: ["category"] });
  }
  async getAllVictimsByMentor(id: number) {
    return Victim.find({
      where: { status: Not(8), user: { id } },
      relations: ["category"],
    });
  }
  async getSingleVictim(id: number) {
    const victim = await Victim.findOne({
      where: { status: Not(8), id: id },
      relations: ["category"],
    });
    if (!victim) throw new BadRequestException(`This victim ${id} not found`);
    return victim;
  }
  async assignCategoryToVictim(victimId: number, categoryId: number) {
    const category = await Category.findOne({
      where: { id: categoryId },
    });
    if (!category)
      throw new BadRequestException(`This category ${categoryId} not found`);
    const victim = await Victim.findOne({
      where: { id: victimId },
    });
    if (!victim)
      throw new BadRequestException(`This victim ${victimId} not found`);
    victim.category = category;
    try {
      const data = await Victim.update(victimId, victim);
      return this.response.updateResponse(victimId);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async deleteVictim(id: number) {
    const victim = await Victim.findOne({
      where: { status: Not(8), id: id },
    });
    if (!victim) throw new BadRequestException(`This victim ${id} not found`);
    try {
      victim.status = 8;
      await Victim.update(id, victim);
      return this.response.deleteResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
}
