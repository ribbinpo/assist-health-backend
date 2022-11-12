import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Room } from '@prisma/client';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('getAll')
  @HttpCode(200)
  getAll() {
    return this.roomService.getAll();
  }

  @Get('/getById')
  @HttpCode(200)
  getById(@Query('id') id: number) {
    return this.roomService.getById(Number(id));
  }

  @Post('create')
  @HttpCode(201)
  create(@Body() createRoom: Room) {
    return this.roomService.create(createRoom);
  }

  @Put('update')
  @HttpCode(200)
  update() {
    return '';
  }

  @Delete('delete')
  @HttpCode(200)
  delete() {
    return '';
  }
}
