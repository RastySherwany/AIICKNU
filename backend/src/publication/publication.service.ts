import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PublicationService {
  constructor(private prisma: PrismaService) {}

  create(createPublicationDto: any) {
    return this.prisma.publication.create({ data: createPublicationDto });
  }

  findAll() {
    return this.prisma.publication.findMany();
  }

  findOne(id: string) {
    return this.prisma.publication.findUnique({ where: { id } });
  }

  update(id: string, updatePublicationDto: any) {
    return this.prisma.publication.update({ where: { id }, data: updatePublicationDto });
  }

  remove(id: string) {
    return this.prisma.publication.delete({ where: { id } });
  }
}
