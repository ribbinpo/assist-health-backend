import { Controller, Get, Query } from '@nestjs/common';
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
}
