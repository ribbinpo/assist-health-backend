import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GENDER } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async editUser(user: {
    id: string;
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
  }) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: +user.id,
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        passport: user.passport,
        gender: user.gender,
        bloodType: user.bloodType,
        country: user.country,
        weight: user.weight,
        height: user.height,
        phoneNumber: user.phoneNumber,
        professional: user.professional,
        specialSkills: user.specialSkills,
        certificate: user.certificate,
        role_id: user.role_id,
      },
    });
    console.log(updatedUser);
    return updatedUser;
  }
}
