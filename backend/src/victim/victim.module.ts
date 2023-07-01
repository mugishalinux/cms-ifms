import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";

import { FilterHelper } from "../helpers/filter.helper";
import { VictimController } from "./victim.controller";
import { UserService } from "../user/user/user.service";
import { VictimService } from "./victim.service";
import { CertificateModule } from "../certificates/certificate.module";
import { VictimsController } from "./victims.controller";

@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule, CertificateModule],
  controllers: [VictimController,VictimsController],
  providers: [
    UserService,
    VictimService,
    JwtService,
    FilterHelper,
  ],
  exports: [],
})
export class VictimModule {}
