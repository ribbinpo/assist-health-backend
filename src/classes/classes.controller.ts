import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get('')
  getAll() {
    return this.classesService.getAll();
  }

  @Post('create')
  @HttpCode(200)
  create() {
    return this.classesService.create();
  }
}
