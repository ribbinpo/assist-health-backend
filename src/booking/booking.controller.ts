import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TrainerUser } from '@prisma/client';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get('bookClassSchdule')
  bookClassSchdule(
    @Query('userId') userId: number,
    @Query('classScheduleId') classScheduleId: number,
  ) {
    return this.bookingService.bookClassSchdule(userId, classScheduleId);
  }
  @Get('bookClassSchduleCancel')
  bookClassSchduleCanel(
    @Query('userId') userId: string,
    @Query('classScheduleId') classScheduleId: string,
  ) {
    return this.bookingService.bookClassSchduleCancel(
      +userId,
      +classScheduleId,
    );
  }

  @Get('bookTrainerCancel')
  bookTrainerCancel(
    @Query('customerId') customerId: string,
    @Query('trainerId') trainerId: string,
  ) {
    return this.bookingService.bookTrainerCancel(+customerId, +trainerId);
  }

  @Post('bookTrainer')
  bookTrainer(@Body() bookTrainer: TrainerUser) {
    return this.bookingService.bookTrainer(bookTrainer);
  }
}
