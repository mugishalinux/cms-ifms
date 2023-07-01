import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Victim } from "../../victim/entity/victim.entity";

export class CertificateUpdateDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "victim id required",
  })
  victim: number;
  @IsNotEmpty()
  @ApiProperty({
    description: "is allowed status is required",
  })
  isAllowed: boolean;
}
