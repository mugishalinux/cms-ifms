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
import { CategoryService } from "./category.service";
import { CategoryRegisterDto } from "./register.category";
import { CategoryUpateDto } from "./update.dto";

@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}
  @HasRoles("admin")
  @Post("creation")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createCategories(@Body() data: CategoryRegisterDto, @Request() req) {
    return this.categoryService.createCategory(data, req.user.userId);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id")
  getSingleCategory(@Param("id") id: number, @Request() req) {
    console.log();
    return this.categoryService.getSingleCategory(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("")
  getSingleAllCategory() {
    return this.categoryService.getAllCategories();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updateCategory(
    @Param("id") id: number,
    @Body() data: CategoryUpateDto,
    @Request() req,
  ) {
    return this.categoryService.updateCategory(id, data, req.user.userId);
  }
  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  deleteCategory(@Param("id") id: number, @Request() req) {
    return this.categoryService.deleteCategory(id, req.user.userId);
  }
}
