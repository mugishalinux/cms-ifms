import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
  HttpException,
  HttpStatus,
  ConsoleLogger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth/auth.service";
import { FilterHelper } from "../helpers/filter.helper";
import { Not } from "typeorm";

import { HasRoles } from "../auth/has-roles.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { CertificateService } from "./certificate.service";
import { CertificateUpdateDto } from "./dto/update.certificate.dto";

@Controller("certificate")
@ApiTags("certificate")
export class CertificateController {
  constructor(
    private certificateService: CertificateService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id")
  getSingleCertificate(@Param("id") id: number, @Request() req) {
    console.log();
    return this.certificateService.getSingleCertificate(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("")
  getSingleAllCertificate() {
    return this.certificateService.getAllCertificate();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updateCertificate(
    @Param("id") id: number,
    @Body() data: CertificateUpdateDto,
    @Request() req,
  ) {
    return this.certificateService.updateCertificate(id, data);
  }
  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  deleteCertificate(@Param("id") id: number, @Request() req) {
    return this.certificateService.deleteCertificate(id, req.user.userId);
  }
}
