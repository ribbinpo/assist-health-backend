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

  @Get('getByUserId')
  getByUserId(@Query('id') id: string) {
    return this.classesService.getByUserId(+id);
  }

  @Get('getByDate')
  getByDate(@Query('date') date: Date) {
    return this.classesService.getByDate(date);
  }
  

  @Post('create')
  @HttpCode(200)
  create(@Body() creatClass: ClassSchedule) {
    return this.classesService.create(creatClass);
  }
}
