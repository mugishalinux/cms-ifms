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
import { Category } from "./entity/category.entity";
import { CategoryRegisterDto } from "./register.category";
import { CategoryUpateDto } from "./update.dto";
export type Usa = any;
@Injectable()
export class CategoryService {
  constructor(private response: ResponseService) {}

  async createCategory(data: CategoryRegisterDto, id: number) {
    const category = new Category();
    category.cateogryName = data.categoryName;
    category.status = 1;
    category.created_by = id;
    category.updated_by = id;
    try {
      const data = await category.save();
      return this.response.postResponse(data.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async updateCategory(id: number, data: CategoryUpateDto, userId: number) {
    const category = await Category.findOne({
      where: { id },
    });
    if (!category)
      throw new BadRequestException(`This category ${id} not found`);
    category.cateogryName = data.categoryName;
    category.updated_by = userId;
    try {
      const data = await Category.update(id, category);
      return this.response.updateResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async getAllCategories() {
    return Category.find({ where: { status: Not(8) } });
  }
  async getSingleCategory(id: number) {
    const category = await Category.findOne({
      where: { status: Not(8), id: id },
    });
    if (!category)
      throw new BadRequestException(`This category ${id} not found`);
    return category;
  }
  async deleteCategory(id: number, userId: number) {
    const category = await Category.findOne({
      where: { id },
    });
    
    if (!category)
      throw new BadRequestException(`This category ${id} not found`);
    try {
      category.status = 8;
      category.updated_by = userId;
      await Category.update(id, category);
      return this.response.deleteResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
}
