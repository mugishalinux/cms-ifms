import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Victim } from "../../victim/entity/victim.entity";

export class CertificateRegisterDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "victim id required",
  })
  victim: number;
}
