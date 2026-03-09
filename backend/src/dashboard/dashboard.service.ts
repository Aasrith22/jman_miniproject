import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getOverviewStats() {
        const [totalStudents, totalCourses, totalEnrollments, totalAssessments] =
            await Promise.all([
                this.prisma.user.count({ where: { user_role: 'STUDENT' } }),
                this.prisma.course.count(),
                this.prisma.enrollment.count(),
                this.prisma.assessment.count(),
            ]);

        return { totalStudents, totalCourses, totalEnrollments, totalAssessments };
    }

    async getCourseStats() {
        const courses = await this.prisma.course.findMany({
            include: {
                instructor: { select: { full_name: true } },
                enrolled_students: true,
                modules: true,
                assessments: {
                    include: {
                        attempts: { select: { score: true } },
                    },
                },
            },
        });

        return courses.map((course) => {
            const allScores = course.assessments.flatMap((a) =>
                a.attempts.filter((t) => t.score !== null).map((t) => t.score as number),
            );
            const avgScore =
                allScores.length > 0
                    ? Math.round((allScores.reduce((s, v) => s + v, 0) / allScores.length) * 100) / 100
                    : null;

            return {
                courseId: course.course_id,
                courseName: course.course_name,
                technology: course.technology,
                instructor: course.instructor.full_name,
                enrollmentCount: course.enrolled_students.length,
                moduleCount: course.modules.length,
                avgScore,
            };
        });
    }

    async getAssessmentPerformance() {
        const assessments = await this.prisma.assessment.findMany({
            include: {
                module: { select: { module_title: true } },
                course: { select: { course_name: true } },
                attempts: { select: { score: true } },
            },
        });

        return assessments.map((a) => {
            const scores = a.attempts
                .filter((t) => t.score !== null)
                .map((t) => t.score as number);

            return {
                assessmentId: a.assessment_id,
                title: a.title,
                moduleName: a.module.module_title,
                courseName: a.course?.course_name ?? 'N/A',
                totalMarks: a.total_marks,
                totalAttempts: a.attempts.length,
                avgScore: scores.length > 0
                    ? Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 100) / 100
                    : null,
                highestScore: scores.length > 0 ? Math.max(...scores) : null,
                lowestScore: scores.length > 0 ? Math.min(...scores) : null,
            };
        });
    }

    async getStudentPerformance() {
        const students = await this.prisma.user.findMany({
            where: { user_role: 'STUDENT' },
            include: {
                enrolled_courses: true,
                attempts: { select: { score: true } },
            },
        });

        return students.map((s) => {
            const scores = s.attempts
                .filter((a) => a.score !== null)
                .map((a) => a.score as number);

            return {
                userId: s.user_id,
                fullName: s.full_name,
                email: s.email,
                coursesEnrolled: s.enrolled_courses.length,
                assessmentsAttempted: s.attempts.length,
                avgScore: scores.length > 0
                    ? Math.round((scores.reduce((sum, v) => sum + v, 0) / scores.length) * 100) / 100
                    : null,
            };
        });
    }

    async getRecentAttempts() {
        const attempts = await this.prisma.attempt.findMany({
            orderBy: { started_at: 'desc' },
            take: 10,
            include: {
                user: { select: { full_name: true } },
                assessment: { select: { title: true } },
            },
        });

        return attempts.map((a) => ({
            attemptId: a.attempt_id,
            studentName: a.user.full_name,
            assessmentTitle: a.assessment.title,
            score: a.score,
            startedAt: a.started_at,
            completedAt: a.completed_at,
        }));
    }
}
