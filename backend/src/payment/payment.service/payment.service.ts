import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Not } from "typeorm";
import e from "express";
import { ResponseService } from "../../response/response.service";
import { Payment } from "../entity/payment.entity";
import { Booking } from "../../booking/entity/booking.entity";
import { PaymentDto } from "../dto/payment.dto";
import { ReferencesService } from "../references.generator";
import { User } from "../../user/user/entity/user.entity";
@Injectable()
export class PaymentService {
  constructor(
    private response: ResponseService,
    private referencesServices: ReferencesService,
  ) {}

  async initiatePayment(data: PaymentDto) {
    const payment = new Payment();
    //checking if booking exist
    const booking = await Booking.findOne({
      where: { status: Not(8), id: data.booking },
    });
    if (!booking)
      throw new BadRequestException(`This booking ${data.booking} not found`);

    const user = await User.findOne({
      where: { status: Not(8), id: data.user },
    });
    if (!user)
      throw new BadRequestException(`This booking ${data.user} not found`);

    payment.booking = booking;
    payment.user = user;
    payment.amount = data.amount;
    payment.paymentStatus = "pending";
    payment.iniPaymentRef = parseInt(
      await this.referencesServices.generateInternalRefId(),
      10,
    );
    payment.extPaymentRef = parseInt(
      await this.referencesServices.generateInternalRefId(),
      10,
    );
    payment.accountNumber = data.accountNumber;
    payment.status = 1;
    payment.created_by = 1;
    payment.updated_by = 1;
    try {
      const data = await payment.save();
      return this.response.postResponse(data.id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }

  async getSinglePayment(id: number) {
    const payment = await Payment.findOne({
      relations: {
        booking: true,
      },
      where: { status: Not(8), id: id },
    });
    if (!payment) throw new BadRequestException(`This payment ${id} not found`);
    return payment;
  }
  async getAllPayment(id: number) {
    return Payment.query(`SELECT
    p.*
  FROM
    payment p
    INNER JOIN booking b ON p. "bookingId" = b.id
    INNER JOIN boat bo ON b. "boatId" = bo.id
    INNER JOIN "users" u ON bo. "userId" = u.id
  WHERE
    p.status <> ${8}
    AND u.id = ${id};`);
  }

  async deletePayment(id: number) {
    const payment = await Payment.findOne({
      relations: {
        booking: true,
      },
      where: { status: Not(8), id: id },
    });
    if (!payment) throw new BadRequestException(`This payment ${id} not found`);
    try {
      payment.status = 8;
      payment.updated_by = 1;
      await Payment.update(id, payment);
      return this.response.deleteResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async paymemtUpdateStatus(iniPaymentRef: number, status: string) {
    const payment = await Payment.findOne({
      relations: {
        booking: true,
      },
      where: { status: Not(8), iniPaymentRef },
    });
    if (!payment)
      throw new BadRequestException(`This payment ${iniPaymentRef} not found`);

    try {
      payment.paymentStatus = status;
      await Payment.update(payment.id, payment);
      return this.response.updateResponse(payment.id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }

  async createPayments() {
    // Fetch the booking records
    const bookings = await Booking.find();

    // Generate payment records for each booking
    const payments: Payment[] = [];
    for (const booking of bookings) {
      const payment = new Payment();
      payment.amount = Math.floor(Math.random() * 90000) + 10000; // Generate random amount (between 10000 and 99999)
      payment.paymentStatus = this.generateRandomPaymentStatus(); // Generate random payment status
      payment.iniPaymentRef = Math.floor(Math.random() * 1000000) + 1; // Generate random iniPaymentRef
      payment.extPaymentRef = Math.floor(Math.random() * 1000000) + 1; // Generate random extPaymentRef
      payment.status = 1;
      payment.accountNumber = this.generateRandomAccountNumber(); // Generate random account number
      payment.created_by = 1;
      payment.updated_by = 1;

      // Set created_at to a random past date or today's date
      const isToday = Math.random() < 0.5; // 50% chance for today's date
      if (isToday) {
        payment.created_at = new Date(); // Set created_at to today's date
      } else {
        payment.created_at = this.generateRandomPastDate(); // Set created_at to a random past date
      }

      payment.updated_at = new Date(); // Set updated_at to current date
      payment.booking = booking;
      payment.user = null;
      await payment.save();
    }
  }

  private generateRandomPaymentStatus(): string {
    const statuses = ["pending", "approved", "rejected"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }

  private generateRandomAccountNumber(): string {
    const accountNumber = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0");
    return accountNumber;
  }

  private generateRandomPastDate(): Date {
    const startDate = new Date(2020, 5, 20); // June 20, 2020
    const endDate = new Date(); // Current date
    const randomTimestamp =
      Math.random() * (endDate.getTime() - startDate.getTime()) +
      startDate.getTime();
    return new Date(randomTimestamp);
  }
}
