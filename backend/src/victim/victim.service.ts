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
export type Usa = any;
@Injectable()
export class VictimService {
  constructor(
    private response: ResponseService,
    private certificateService: CertificateService,
  ) {}

  async createVictim(data: VictimRegisterDto) {
    const victim = new Victim();
    victim.firstName = data.firstName;
    victim.lastName = data.lastName;
    victim.dob = data.dob;
    victim.primaryPhone = data.phoneNumber;
    victim.status = 2;
    victim.created_by = 1;
    victim.updated_by = 1;
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
      const data = await victim.save();
      await this.certificateService.createCertificate(data.id);
      return this.response.postResponse(data.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }

  async updateVictim(id: number, data: VictimRegisterDto) {
    const victim = await Victim.findOne({
      where: { id },
    });
    if (!victim) throw new BadRequestException(`This victim ${id} not found`);
    victim.firstName = data.firstName;
    victim.lastName = data.lastName;
    victim.dob = data.dob;
    victim.primaryPhone = data.phoneNumber;
    victim.status = 2;
    victim.created_by = 1;
    victim.updated_by = 1;
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
