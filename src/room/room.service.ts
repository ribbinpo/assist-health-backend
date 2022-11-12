import { ForbiddenException, Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Room[]> {
    const rooms = await this.prisma.room.findMany();
    return rooms;
  }

  async getById(id: number): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    return room;
  }

  async create(createRoom: Room) {
    // check room name is duplicate or not

    try {
      const room = await this.prisma.room.create({
        data: createRoom,
      });
      return room;
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
  }
}
