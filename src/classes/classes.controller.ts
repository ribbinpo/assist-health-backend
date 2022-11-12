import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ClassSchedule } from '@prisma/client';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get('getAll')
  getAll() {
    return this.classesService.getAll();
  }

  @Get('getById')
  getById(@Query('id') id: string) {
    return this.classesService.getById(Number(id));
  }

  @Post('create')
  @HttpCode(200)
  create(@Body() creatClass: ClassSchedule) {
    return this.classesService.create(creatClass);
  }
}
