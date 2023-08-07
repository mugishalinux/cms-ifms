import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryUpateDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "category name required",
  })
  categoryName: string;
}
