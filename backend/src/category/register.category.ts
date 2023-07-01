import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CategoryRegisterDto {
    @IsNotEmpty()
    @ApiProperty({
      description: "category name required",
    })
    categoryName: string;
  }
  