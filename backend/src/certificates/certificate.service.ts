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
import { CertificateRegisterDto } from "./dto/create.certificate.dto";
import { Certificate } from "./entity/certificate.entity";
import { CertificateUpdateDto } from "./dto/update.certificate.dto";

export type Usa = any;
@Injectable()
export class CertificateService {
  constructor(private response: ResponseService) {}

  async createCertificate(data: number) {
    const certificate = new Certificate();
    const victim = await Victim.findOne({ where: { id: data } });
    certificate.victim = victim;
    certificate.isAllowed = false;
    certificate.status = 1;
    certificate.created_at = new Date();
    certificate.updated_at = new Date();
    certificate.created_by = 1;
    certificate.updated_by = 1;
    try {
      const data = await certificate.save();
      return this.response.postResponse(data.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async updateCertificate(id: number, data: CertificateUpdateDto) {
    const certificate = await Certificate.findOne({
      where: { id },
    });
    if (!certificate)
      throw new BadRequestException(`This certificate ${id} not found`);

    const victim = await Victim.findOne({ where: { id: data.victim } });
    if (!victim) throw new BadRequestException(`This victim ${id} not found`);
    certificate.victim = victim;
    certificate.isAllowed = data.isAllowed;
    certificate.status = 1;
    certificate.created_at = new Date();
    certificate.updated_at = new Date();
    certificate.created_by = 1;
    certificate.updated_by = 1;
    try {
      const data = await Certificate.update(id, certificate);
      return this.response.updateResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async getAllCertificate() {
    return Certificate.find({ where: { status: Not(8) } });
  }
  async getSingleCertificate(id: number) {
    const certificate = await Certificate.findOne({
      where: { status: Not(8), id: id },
    });
    if (!certificate)
      throw new BadRequestException(`This certificate ${id} not found`);
    return certificate;
  }
  async deleteCertificate(id: number, userId: number) {
    const certificate = await Certificate.findOne({
      where: { status: Not(8), id: id },
    });
    if (!certificate)
      throw new BadRequestException(`This certificate ${id} not found`);
    try {
      certificate.status = 8;
      certificate.updated_by = userId;
      await Certificate.update(id, certificate);
      return this.response.deleteResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
}
