import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";

import { FilterHelper } from "../helpers/filter.helper";
import { CertificateController } from "./certificate.controller";
import { UserService } from "../user/user/user.service";
import { CertificateService } from "./certificate.service";

@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule],
  controllers: [CertificateController],
  providers: [
    UserService,
    CertificateService,
    JwtService,
    FilterHelper,
  ],
  exports: [CertificateService],
})
export class CertificateModule {}
