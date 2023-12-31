import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ResponseModule } from "../response/response.module";
import { PaymentReportService } from "./path/report.service";
import { ReportController } from "./path/report.controller";


@Module({
  imports: [forwardRef(() => AuthModule), ResponseModule],
  controllers: [ReportController ],
  providers: [PaymentReportService, JwtService,],
  exports: [],
})
export class ReportModule {}
