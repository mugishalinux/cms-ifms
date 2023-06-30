import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @IsNotEmpty()
  @Matches(/(2507[8,2,3,9])[0-9]{7}/, {
    message:
      "Primary Phone Number must be Airtel or MTN number formatted like 2507*********",
  })
  @IsNotEmpty()
  @ApiProperty({
    description: "phone number required",
  })
  phone: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "password required",
  })
  password: string;
}
