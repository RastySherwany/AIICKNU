import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  create(createNewsDto: any) {
    return this.prisma.news.create({ data: createNewsDto });
  }

  findAll() {
    return this.prisma.news.findMany();
  }

  findOne(id: string) {
    return this.prisma.news.findUnique({ where: { id } });
  }

  update(id: string, updateNewsDto: any) {
    return this.prisma.news.update({ where: { id }, data: updateNewsDto });
  }

  remove(id: string) {
    return this.prisma.news.delete({ where: { id } });
  }
}
