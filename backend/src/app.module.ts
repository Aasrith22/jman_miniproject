import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [InstructorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
