import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
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
  @ApiProperty({
    description: "email required",
  })
  email: string;
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

  @IsNotEmpty()
  @ApiProperty({
    description: "primary phone required",
  })
  phoneNumber: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "medical insurance required ",
  })
  medicalInsurance: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "child parent status required ",
  })
  isOrphan: string;
  @IsOptional()
  @ApiProperty({
    description: "father names ",
  })
  fatherNames: string;
  @IsOptional()
  @ApiProperty({
    description: "mother names ",
  })
  motherNames: string;
  @IsOptional()
  @ApiProperty({
    description: "guardian names ",
  })
  guardiaNames: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "parent / guardian contacts ",
  })
  parentContact: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "child date of birth required",
  })
  childDob: Date;
  @IsNotEmpty()
  @ApiProperty({
    description: "is child raped or tempted status ",
  })
  caseScenario: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "how many sibling victim have ",
  })
  siblingNumber: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "education level background",
  })
  educationLevel: string;
}
