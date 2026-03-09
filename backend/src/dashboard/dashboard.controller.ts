import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';

@Controller('api/dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
    constructor(private dashboardService: DashboardService) { }

    @Get('overview')
    getOverview(@Req() req: any) {
        return this.dashboardService.getOverviewStats(req.user.userId);
    }

    @Get('courses')
    getCourseStats(@Req() req: any) {
        return this.dashboardService.getCourseStats(req.user.userId);
    }

    @Get('assessments')
    getAssessmentPerformance(@Req() req: any) {
        return this.dashboardService.getAssessmentPerformance(req.user.userId);
    }

    @Get('students')
    getStudentPerformance() {
        return this.dashboardService.getStudentPerformance();
    }

    @Get('recent-attempts')
    getRecentAttempts(@Req() req: any) {
        return this.dashboardService.getRecentAttempts(req.user.userId);
    }
}
