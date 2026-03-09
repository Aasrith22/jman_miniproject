import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { CoursemoduleModule } from './coursemodule/coursemodule.module';
import { SectionModule } from './section/section.module';
import { DashboardModule } from './dashboard/dashboard.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, PrismaModule, AuthModule, CourseModule, CoursemoduleModule, SectionModule,DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
