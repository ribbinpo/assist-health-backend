import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { ROLES } from 'src/auth/enum/roles.enum';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
