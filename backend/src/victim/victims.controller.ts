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

import { CategoryUpateDto } from "./update.dto";
import { VictimService } from "./victim.service";
import { VictimRegisterDto } from "./register.victim";

@Controller("mentor")
@ApiTags("mentor")
export class VictimsController {
  constructor(
    private victimService: VictimService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("")
  getSingleAllVictimsByMentor(@Request() req) {
    return this.victimService.getAllVictimsByMentor(req.user.userId);
  }
}
