import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async adduser(dto: CreateUserDto) {
    const ALLOWED_ROLES = [Role.STUDENT, Role.INSTRUCTOR];

    if (!ALLOWED_ROLES.includes(dto.user_role)) {
      throw new ForbiddenException('Invalid role selection');
    }

    return this.prisma.user.create({
      data: {
        full_name: dto.full_name,
        email: dto.email,
        password: dto.password, // hash in real app
        user_role: dto.user_role,
      },
    });
  }

  async getusers(){
    return this.prisma.user.findMany();
  }
}