import {
  Controller,
  Get,
  Query,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { AuthService } from "../../auth/auth.service";
import { Response } from "express";
import { PaymentReportService } from "./report.service";
import { Victim } from "../../victim/entity/victim.entity";
import { District } from "../../user/user/entity/district.entity";
import { Province } from "../../user/user/entity/province.entity";

@Controller("allReports")
@ApiTags("allReports")
export class ReportController {
  //   constructor(
  //     private authService: AuthService,
  //     private reportService: PaymentReportService,
  //     private jwtService: JwtService,
  //   ) {}
  //   @UseGuards(JwtAuthGuard)
  //   @ApiBearerAuth()
  //   @Get("count")
  //   async countPayments(@Request() req) {
  //     const count = await this.reportService.countBookingsBySkipper(
  //       req.user.userId,
  //     );
  //     return count;
  //   }
  //   @UseGuards(JwtAuthGuard)
  //   @ApiBearerAuth()
  //   @Get("calculate")
  //   async generatePayments(@Request() req) {
  //     const count = await this.reportService.countTotalAmoutPayments(
  //       req.user.userId,
  //     );
  //     return count;
  //   }
  //   @UseGuards(JwtAuthGuard)
  //   @ApiBearerAuth()
  //   @Get("calculateDailyIncome")
  //   async dailyIncomeTotalAverage(@Request() req) {
  //     const count = await this.reportService.dailyAverageIncome(req.user.userId);
  //     return count;
  //   }
  //   @UseGuards(JwtAuthGuard)
  //   @ApiBearerAuth()
  //   @Get("calculateTodayIncome")
  //   async currentlyTotalIncome(@Request() req) {
  //     const count = await this.reportService.calculateTodayIncome(
  //       req.user.userId,
  //     );
  //     return count;
  //   }
  //   @UseGuards(JwtAuthGuard)
  //   @ApiBearerAuth()
  //   @Get("calculateTodayPercentage")
  //   async generateDailyPercentage(@Request() req) {
  //     const count = await this.reportService.getTodaysPercentage(req.user.userId);
  //     return count;
  //   }
  //   @UseGuards(JwtAuthGuard)
  //   @ApiBearerAuth()
  //   @Get("sixMonthsAgo")
  //   async sixMonthsAgoReport(@Request() req) {
  //     const count = await this.reportService.totalAmountEarnedLast6Months(
  //       req.user.userId,
  //     );
  //     return count;
  //   }

  //   @Get("image")
  //   async generateImage(
  //     @Query('quote') quote: string,
  //     @Res() res: Response,
  //   ): Promise<void> {
  //     const imageBuffer = await this.reportService.generateImageWithQuote(quote);

  //     res.set('Content-Type', 'image/png');
  //     res.send(imageBuffer);
  //   }
  @ApiBearerAuth()
  @Get("/victim/registered/today")
  async countTodayChristianRegesterd() {
    const val = await Victim.query(`SELECT
      COUNT(*) AS total_records_created_today
  FROM
      victim
  WHERE
      DATE(created_at) = CURDATE();
  `);
    return val[0].total_records_created_today;
  }

  @ApiBearerAuth()
  @Get("/victim/per/location")
  async countVictimsPerLocation() {
    const locations = await Province.find();

    const transformedLocations = locations.map((district) => {
      return {
        id: district.id,
        name: district.name,
      };
    });

    const resultArray = []; // Initialize an empty array

    for (let i = 0; i < transformedLocations.length; i++) {
      const value = await Victim.count({
        where: { user: { province: { id: transformedLocations[i].id } } },
      });

      const locationName = transformedLocations[i].name;

      // Push an object into the array during each iteration
      resultArray.push({
        name: locationName,
        total: value,
      });
    }

    return resultArray;
  }
}
