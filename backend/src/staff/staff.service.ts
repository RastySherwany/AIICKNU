import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  create(createStaffDto: any) {
    return this.prisma.staff.create({ data: createStaffDto });
  }

  findAll() {
    return this.prisma.staff.findMany();
  }

  findOne(id: string) {
    return this.prisma.staff.findUnique({ where: { id } });
  }

  update(id: string, updateStaffDto: any) {
    return this.prisma.staff.update({ where: { id }, data: updateStaffDto });
  }

  remove(id: string) {
    return this.prisma.staff.delete({ where: { id } });
  }
}
