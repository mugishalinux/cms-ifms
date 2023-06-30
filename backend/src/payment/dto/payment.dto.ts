import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "booking id required",
  })
  booking: number;
  @IsNotEmpty()
  @ApiProperty({
    description: "user id required",
  })
  user: number;
  @IsNotEmpty()
  @ApiProperty({
    description: "amount required",
  })
  amount: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "account number is required required",
  })
  accountNumber: string;
}
