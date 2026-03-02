import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { CoursemoduleModule } from './coursemodule/coursemodule.module';
import { SectionModule } from './section/section.module';
@Module({
  imports: [UserModule, PrismaModule, AuthModule, CourseModule, CoursemoduleModule, SectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
