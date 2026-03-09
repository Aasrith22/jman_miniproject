import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('api/dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) { }

    @Get('overview')
    getOverview() {
        return this.dashboardService.getOverviewStats();
    }

    @Get('courses')
    getCourseStats() {
        return this.dashboardService.getCourseStats();
    }

    @Get('assessments')
    getAssessmentPerformance() {
        return this.dashboardService.getAssessmentPerformance();
    }

    @Get('students')
    getStudentPerformance() {
        return this.dashboardService.getStudentPerformance();
    }

    @Get('recent-attempts')
    getRecentAttempts() {
        return this.dashboardService.getRecentAttempts();
    }
}
