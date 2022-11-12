import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ClassSchedule, CLASSTYPE, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<ClassSchedule[]> {
    const classes = await this.prisma.classSchedule.findMany();
    return classes;
  }

  async getById(id: number): Promise<{ detail: ClassSchedule; users: User[] }> {
    const classes = await this.prisma.classSchedule.findUnique({
      where: {
        id,
      },
    });
    const users = await this.prisma.user.findMany({
      where: {
        classSchedule: {
          some: {
            classSchedule: {
              id: classes.id,
            },
          },
        },
      },
    });
    const response = { detail: classes, users };
    return response;
  }

  async create(creatClass: ClassSchedule) {
    try {
      const classes = await this.prisma.classSchedule.create({
        data: {
          ...creatClass,
          classType: CLASSTYPE[creatClass.classType],
        },
      });
      return classes;
    } catch (error) {
      console.log(error);
      // Error from Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        // Error when duplicate
        if (error.code === 'P2002') {
          throw new ForbiddenException('Room have it already!');
        }
      }
    }
    return;
  }
}
