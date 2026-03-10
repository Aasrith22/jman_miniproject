import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        full_name: dto.full_name,
        email: dto.email,
        password: hashedPassword,
        user_role: dto.user_role,
      },
      select: {
        user_id: true,
        full_name: true,
        email: true,
        user_role: true,
      },
    });

    this.logger.log(`New user registered: ${user.email} [${user.user_role}]`);

    const token = this.generateToken(user);

    return {
      message: 'Registration successful',
      data: { user, access_token: token },
    };
  }

  async login(dto: LoginDto) {

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password , user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(user);

    return {
      message: 'Login successful',
      data: {
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          user_role: user.user_role,
        },
        access_token: token,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        full_name: true,
        email: true,
        user_role: true,
        enrolled_courses: {
          select: {
            entrollment_id: true,
            enrolled_at: true,
            progress: true,
            course: {
              select: {
                course_id: true,
                course_name: true,
                technology: true,
              },
            },
          },
        },
      },
    });

    return { message: 'Profile retrieved', data: user };
  }

  private generateToken(user: { user_id: string; email: string; user_role: string; full_name: string }) {
    const payload = {
      sub: user.user_id,
      email: user.email,
      user_role: user.user_role,
      full_name: user.full_name,
    };

    return this.jwtService.sign(payload);
  }
}
