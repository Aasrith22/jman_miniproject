import { Test, TestingModule } from '@nestjs/testing';
import { ManageCourseController } from './manage-course.controller';

describe('ManageCourseController', () => {
  let controller: ManageCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageCourseController],
    }).compile();

    controller = module.get<ManageCourseController>(ManageCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
