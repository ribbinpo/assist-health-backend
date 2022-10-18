import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard, RolesGuard } from 'src/auth/guard/';
import { Roles } from './auth/decorator';
import { ROLES } from './auth/enum/roles.enum';

@Roles(ROLES.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
