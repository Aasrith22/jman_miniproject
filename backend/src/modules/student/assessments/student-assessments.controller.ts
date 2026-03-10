import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Role } from '../../../common/enums/role.enum';
import { StudentAssessmentsService } from './student-assessments.service';
import { SubmitAssessmentDto } from './dto/assessment.dto';
import { CurrentUser, JwtPayload } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';

@Roles(Role.STUDENT)
@Controller('student/assessments')
export class StudentAssessmentsController {
  constructor(private readonly assessmentsService: StudentAssessmentsService) { }

  @Get(':assessmentId')
  async getAssessment(
    @Param('assessmentId', ParseUUIDPipe) assessmentId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.assessmentsService.getAssessment(user.sub, assessmentId);
  }

  @Post(':assessmentId/submit')
  @HttpCode(HttpStatus.OK)
  async submitAssessment(
    @Param('assessmentId', ParseUUIDPipe) assessmentId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: SubmitAssessmentDto,
  ) {
    return this.assessmentsService.submitAssessment(user.sub, assessmentId, dto);
  }

  @Get(':assessmentId/history')
  async getAttemptHistory(
    @Param('assessmentId', ParseUUIDPipe) assessmentId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.assessmentsService.getAttemptHistory(user.sub, assessmentId);
  }

  @Get('attempts/:attemptId')
  async getAttemptDetails(
    @Param('attemptId', ParseUUIDPipe) attemptId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.assessmentsService.getAttemptDetails(user.sub, attemptId);
  }

}
