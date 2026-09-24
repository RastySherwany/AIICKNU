import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  create(createActivityDto: any) {
    return this.prisma.activity.create({ data: createActivityDto });
  }

  findAll() {
    return this.prisma.activity.findMany();
  }

  findOne(id: string) {
    return this.prisma.activity.findUnique({ where: { id } });
  }

  update(id: string, updateActivityDto: any) {
    return this.prisma.activity.update({ where: { id }, data: updateActivityDto });
  }

  remove(id: string) {
    return this.prisma.activity.delete({ where: { id } });
  }
}
