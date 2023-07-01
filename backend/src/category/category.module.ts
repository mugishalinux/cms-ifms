import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";

import { FilterHelper } from "../helpers/filter.helper";
import { CategoryController } from "./category.controller";
import { UserService } from "../user/user/user.service";
import { CategoryService } from "./category.service";

@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule],
  controllers: [CategoryController],
  providers: [
    UserService,
    CategoryService,
    JwtService,
    FilterHelper,
  ],
  exports: [],
})
export class CategoryModule {}
