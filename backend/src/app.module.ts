import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { User } from "./user/user/entity/user.entity";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "./user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { FilterHelper } from "./helpers/filter.helper";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bull";
import { ResponseModule } from "./response/response.module";
import { ReportModule } from "./reports/report.module";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/entity/category.entity";
import { VictimModule } from "./victim/victim.module";
import { Victim } from "./victim/entity/victim.entity";
import { Certificate } from "./certificates/entity/certificate.entity";
import { CertificateModule } from "./certificates/certificate.module";
import { Province } from "./user/user/entity/province.entity";
import { District } from "./user/user/entity/district.entity";
import { Sector } from "./user/user/entity/sector.entity";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: "./imageFiles",
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [User, Category, Victim, Certificate, Province, District, Sector],
      logging: false,
      synchronize: true,
      // logging:true
    }),
    // PeriodsModule,
    CategoryModule,
    HttpModule,
    AuthModule,
    UserModule,
    ResponseModule,
    ReportModule,
    VictimModule,
    CertificateModule,
  
    // LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, FilterHelper],
})
export class AppModule {}
