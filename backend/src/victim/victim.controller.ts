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
import { User } from "../user/user/entity/user.entity";

@Controller("victim")
@ApiTags("victim")
export class VictimController {
  constructor(
    private victimService: VictimService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}
  @HasRoles("admin")
  @Post("creation")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createVictim(@Body() data: VictimRegisterDto, @Request() req) {
    return this.victimService.createVictim(data);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id")
  getSingleVictim(@Param("id") id: number, @Request() req) {
    console.log();
    return this.victimService.getSingleVictim(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("")
  async getSingleAllVictims(@Request() req) {
    const user = await User.findOne({
      where: { id: req.user.userId },
    });
    if (!user)
      throw new BadRequestException(`This user ${req.user.userId} not found`);
    if (user.access_level == "mentor") {
      return this.victimService.getAllByUserVictims(req.user.userId);
    } else {
      return this.victimService.getAllVictims();
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updateVictim(
    @Param("id") id: number,
    @Body() data: VictimRegisterDto,
    @Request() req,
  ) {
    return this.victimService.updateVictim(id, data);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("/assign/:id/:catId")
  assignVictim(
    @Param("id") id: number,
    @Param("catId") catId: number,
    @Request() req,
  ) {
    return this.victimService.assignCategoryToVictim(id, catId);
  }
  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  deleteVictim(@Param("id") id: number, @Request() req) {
    return this.victimService.deleteVictim(id);
  }
}
