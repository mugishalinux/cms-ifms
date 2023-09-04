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
import { Victim } from "./entity/victim.entity";

@Controller("victim-report")
@ApiTags("victim-report")
export class VictimReportController {
  constructor() {}

  @ApiBearerAuth()
  @HasRoles("admin")
  @Get(":id")
  getAllVictimsFinished(@Param("id") id: number) {
    const victims = Victim.query(`SELECT
    v.*,
    c.cateogryName
  FROM
    victim v
    JOIN category c ON v.categoryId = c.id
  WHERE
    v.created_at <= DATE_SUB(NOW(), INTERVAL 2 YEAR)
    AND v.categoryId = ${id};`);
    return victims;
  }
  @ApiBearerAuth()
  @HasRoles("admin")
  @Get("/unfinished/:id")
  getAllVictimsNotYetFinished(@Param("id") id: number) {
    const victims = Victim.query(`SELECT v.*, c.cateogryName
        FROM victim v
        JOIN category c ON v.categoryId = c.id
        WHERE v.created_at >= DATE_SUB(NOW(), INTERVAL 2 YEAR) AND v.categoryId = ${id};;
        
        `);
    return victims;
  }
}
