import { Test, TestingModule } from '@nestjs/testing';
import { ManageCourseService } from './manage-course.service';

describe('ManageCourseService', () => {
  let service: ManageCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageCourseService],
    }).compile();

    service = module.get<ManageCourseService>(ManageCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
