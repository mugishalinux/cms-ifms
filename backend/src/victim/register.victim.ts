import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Matches } from "class-validator";
import { User } from "../user/user/entity/user.entity";

export class VictimRegisterDto {
  @IsNotEmpty()
  @ApiProperty({ description: "please enter first name" })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ description: "please enter last name" })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ description: "please enter date of birth" })
  dob: Date;

  @IsNotEmpty()
  @Matches(/(07[8,2,3,9])[0-9]{7}/, {
    message:
      "Primary Phone Number must be Airtel or MTN number formatted like 07*********",
  })
  @ApiProperty({
    description: "primary phone required",
  })
  phoneNumber: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "user is required",
  })
  user: number;
  @IsOptional()
  @ApiProperty({
    description: "category is required",
  })
  category: number;
}
