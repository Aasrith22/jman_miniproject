const BASE_URL = 'http://localhost:3000/api';

export interface OverviewStats {
    totalStudents: number;
    totalCourses: number;
    totalEnrollments: number;
    totalAssessments: number;
}

export interface CourseStat {
    courseId: string;
    courseName: string;
    technology: string;
    instructor: string;
    enrollmentCount: number;
    moduleCount: number;
    avgScore: number | null;
}

export interface AssessmentStat {
    assessmentId: string;
    title: string;
    moduleName: string;
    courseName: string;
    totalMarks: number | null;
    totalAttempts: number;
    avgScore: number | null;
    highestScore: number | null;
    lowestScore: number | null;
}

export interface StudentStat {
    userId: string;
    fullName: string;
    email: string;
    coursesEnrolled: number;
    assessmentsAttempted: number;
    avgScore: number | null;
}

export interface RecentAttempt {
    attemptId: string;
    studentName: string;
    assessmentTitle: string;
    score: number | null;
    startedAt: string;
    completedAt: string | null;
}

async function fetchJson<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export const fetchOverview = () => fetchJson<OverviewStats>('/dashboard/overview');
export const fetchCourseStats = () => fetchJson<CourseStat[]>('/dashboard/courses');
export const fetchAssessmentPerformance = () => fetchJson<AssessmentStat[]>('/dashboard/assessments');
export const fetchStudentPerformance = () => fetchJson<StudentStat[]>('/dashboard/students');
export const fetchRecentAttempts = () => fetchJson<RecentAttempt[]>('/dashboard/recent-attempts');
