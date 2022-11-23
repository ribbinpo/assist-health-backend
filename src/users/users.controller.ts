import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { GENDER } from '@prisma/client';
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

  @Put()
  editUser(
    @Body()
    user: {
      id: string;
      username: string | null;
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      birthday: Date | null;
      passport: string | null;
      gender: GENDER | null;
      bloodType: string | null;
      country: string | null;
      weight: number | null;
      height: number | null;
      phoneNumber: string | null;
      professional: string | null;
      specialSkills: string | null;
      certificate: string | null;
      role_id: number | null;
    },
  ) {
    return this.usersService.editUser(user);
  }
}
