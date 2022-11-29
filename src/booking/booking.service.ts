import { Injectable } from '@nestjs/common';
import { TrainerUser } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async bookClassSchdule(userId: number, classScheduleId: number) {
    // Check ClassSchule and User is have already???

    // Add UseronClassSchedule with userId, classScheduleId
    console.log(userId);
    console.log(classScheduleId);
    const userOnClassSchedule = await this.prisma.useronClassSchedule.create({
      data: {
        userId: Number(userId),
        classScheduleId: Number(classScheduleId),
      },
      include: {
        user: true,
        classSchedule: true,
      },
    });
    const { entries, limit } = await this.prisma.classSchedule.findFirst({
      where: {
        id: Number(classScheduleId),
      },
    });
    // Update entries column on classSchedule table
    // Check entries + 1 cannot more than limit
    if (entries + 1 > limit) {
      console.log('Error');
    }
    const updateClassSchedule = await this.prisma.classSchedule.update({
      where: { id: Number(classScheduleId) },
      data: {
        entries: Number(entries) + 1,
      },
    });
    console.log(updateClassSchedule);
    return userOnClassSchedule;
  }

  async bookClassSchduleCancel(userId: number, classScheduleId: number) {
    const deleteClass = await this.prisma.useronClassSchedule.deleteMany({
      where: { userId, classScheduleId },
    });
    const classSchedule = await this.prisma.classSchedule.findFirst({
      where: { id: classScheduleId },
    });
    const updatedClass = await this.prisma.classSchedule.update({
      where: {
        id: classScheduleId,
      },
      data: {
        entries: classSchedule.entries - 1,
      },
    });
    console.log(deleteClass);
    return deleteClass;
  }

  async bookTrainer(bookTrainer: TrainerUser) {
    const bookTrainerRes = await this.prisma.trainerUser.create({
      data: {
        ...bookTrainer,
      },
    });
    console.log(bookTrainerRes);
    return bookTrainerRes;
  }

  async bookTrainerCancel(customerId: number, trainerId: number) {
    const deleteClass = await this.prisma.trainerUser.deleteMany({
      where: { customer_id: customerId, trainer_id: trainerId },
    });
    console.log(deleteClass);
    return deleteClass;
  }
}
