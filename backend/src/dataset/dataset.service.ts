import { Injectable } from '@nestjs/common';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DatasetService {
  constructor(private prisma: PrismaService) {}

  create(createDatasetDto: any) {
    return this.prisma.dataset.create({ data: createDatasetDto });
  }

  findAll() {
    return this.prisma.dataset.findMany();
  }

  findOne(id: string) {
    return this.prisma.dataset.findUnique({ where: { id } });
  }

  update(id: string, updateDatasetDto: any) {
    return this.prisma.dataset.update({ where: { id }, data: updateDatasetDto });
  }

  remove(id: string) {
    return this.prisma.dataset.delete({ where: { id } });
  }
}
